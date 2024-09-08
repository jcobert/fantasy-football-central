import { format } from 'date-fns'
import { partition } from 'lodash'
import { FC } from 'react'
import { AiOutlineSwap } from 'react-icons/ai'
import { PiMinusBold, PiPlusBold, PiPlusMinus } from 'react-icons/pi'

import { forceArray } from '@/utils/array'
import { cn } from '@/utils/style'
import { formatPlayerName } from '@/utils/yahoo/player'
import {
  Transaction,
  TransactionPlayer,
  TransactionType,
} from '@/utils/yahoo/types/common'

export const TransactionIcon = (type?: Transaction['type']) => {
  let icon: JSX.Element | null = null
  switch (type) {
    case TransactionType.Add:
      icon = <PiPlusBold className='text-green-700 dark:text-green-500' />
      break
    case TransactionType.Drop:
      icon = <PiMinusBold className='text-red-700 dark:text-red-400' />
      break
    case TransactionType.AddDrop:
      icon = (
        <PiPlusMinus className='text-lg text-zinc-600 dark:text-zinc-300' />
      )
      break
    case TransactionType.Trade:
      icon = (
        <AiOutlineSwap className='text-sky-600 dark:text-sky-500 text-lg' />
      )
      break
    default:
      break
  }
  return icon
}

type Props = {
  transaction: Transaction
}

const TransactionCard: FC<Props> = ({ transaction }) => {
  const players = forceArray(transaction?.players?.player)

  let added: TransactionPlayer[] = []
  let dropped: TransactionPlayer[] = []
  let fromTrader: TransactionPlayer[] = []
  let toTrader: TransactionPlayer[] = []
  switch (transaction?.type) {
    case TransactionType.Add:
      {
        added = players
      }
      break
    case TransactionType.Drop:
      dropped = players
      break
    case TransactionType.AddDrop:
      {
        const part = partition(
          players,
          (player) => player?.transactionData?.type === TransactionType.Add,
        )
        added = part?.[0]
        dropped = part?.[1]
      }
      break
    case TransactionType.Trade:
      {
        const trader = transaction?.traderTeamKey
        const part = partition(
          players,
          (player) => player?.transactionData?.sourceTeamKey === trader,
        )
        fromTrader = part?.[0]
        toTrader = part?.[1]
      }
      break
    default:
      break
  }

  if (!transaction)
    return (
      <div className='h-[3.825rem] bg-zinc-200 p-4 flex gap-4 items-center animate-pulse rounded-full dark:bg-zinc-600'>
        <div className='w-4 h-4 rounded-full bg-zinc-300'></div>
        <div className='flex flex-col gap-2'>
          <div className='rounded-full bg-zinc-300 h-4 w-32'></div>
          <div className='rounded-full bg-zinc-300 h-4 w-20'></div>
        </div>
      </div>
    )

  return (
    <div
      className={cn(
        'flex flex-col text-xs flex-auto items-center_ flex-wrap_ gap-2 p-1 sm:p-3 border rounded-md transition border-zinc-400- dark:border-zinc-500 group bg-zinc-50 dark:bg-zinc-600',
        {
          // "bg-green-400/20": transaction?.type === TransactionType.Add,
          // "bg-red-400/20": transaction?.type === TransactionType.Drop,
          // "bg-zinc-300/20": transaction?.type === TransactionType.AddDrop,
          'bg-sky-400/20 dark:bg-sky-400/20':
            transaction?.type === TransactionType.Trade,
        },
      )}
    >
      <div className='flex items-center gap-2 self-start_'>
        {/* Timestamp */}
        <div className='text-2xs'>
          {transaction?.timestamp
            ? format(transaction?.timestamp * 1000, 'EEE, MMM d p')
            : ''}
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {/* Transaction Type */}
        <div>
          <span className='sr-only'>{transaction?.type}</span>
          <div className='min-w-[1.25rem] flex justify-center'>
            {TransactionIcon(transaction?.type)}
          </div>
        </div>

        {/* Teams and Players */}
        <div className='font-bold w-full'>
          {/* Add */}
          {transaction?.type === TransactionType.Add && (
            <div className='flex flex-col'>
              <span>{players?.[0]?.transactionData?.destinationTeamName}</span>
              <div className='flex flex-col font-normal'>
                {added?.map((player) => (
                  <div
                    key={player?.playerId}
                    className='inline-flex items-center gap-1 flex-wrap'
                  >
                    <span>
                      {formatPlayerName({
                        name: player?.name,
                        format: 'short',
                      })}
                    </span>
                    <div className='flex items-center gap-1 text-2xs pt-[2px] text-zinc-600 dark:text-zinc-400'>
                      <span className=''>{player?.displayPosition}</span>
                      <span className='uppercase'>
                        {player?.editorialTeamAbbr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drop */}
          {transaction?.type === TransactionType.Drop && (
            <div className='flex flex-col'>
              <span>{players?.[0]?.transactionData?.sourceTeamName}</span>
              <div className='flex flex-col font-normal'>
                {dropped?.map((player) => (
                  <div
                    key={player?.playerId}
                    className='inline-flex items-center gap-1 flex-wrap'
                  >
                    <span>
                      {formatPlayerName({
                        name: player?.name,
                        format: 'short',
                      })}
                    </span>
                    <div className='flex items-center gap-1 text-2xs pt-[2px] text-zinc-600 dark:text-zinc-400'>
                      <span className=''>{player?.displayPosition}</span>
                      <span className='uppercase'>
                        {player?.editorialTeamAbbr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add/Drop */}
          {transaction?.type === TransactionType.AddDrop && (
            <div>
              <span>{players?.[0]?.transactionData?.destinationTeamName}</span>
              <div className='flex font-normal items-start gap-8'>
                {/* Adds */}
                <div className='flex flex-col mt-1'>
                  <span className='text-2xs text-zinc-600 dark:text-zinc-400'>
                    Added
                  </span>
                  <div className='flex flex-col'>
                    {added?.map((player) => (
                      <div
                        key={player?.playerId}
                        className='inline-flex items-center gap-1 flex-wrap'
                      >
                        <span>
                          {formatPlayerName({
                            name: player?.name,
                            format: 'short',
                          })}
                        </span>
                        <div className='flex items-center gap-1 text-2xs pt-[2px] text-zinc-600 dark:text-zinc-400'>
                          <span className=''>{player?.displayPosition}</span>
                          <span className='uppercase'>
                            {player?.editorialTeamAbbr}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Drops */}
                <div className='flex flex-col mt-1'>
                  <span className='text-2xs text-zinc-600 dark:text-zinc-400'>
                    Dropped
                  </span>
                  <div className='flex flex-col font-normal'>
                    {dropped?.map((player) => (
                      <div
                        key={player?.playerId}
                        className='inline-flex items-center gap-1 flex-wrap'
                      >
                        <span>
                          {formatPlayerName({
                            name: player?.name,
                            format: 'short',
                          })}
                        </span>
                        <div className='flex items-center gap-1 text-2xs pt-[2px] text-zinc-600 dark:text-zinc-400'>
                          <span className=''>{player?.displayPosition}</span>
                          <span className='uppercase'>
                            {player?.editorialTeamAbbr}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trade */}
          {transaction?.type === TransactionType.Trade && (
            <div className='flex items-start gap-8'>
              {/* Trader */}
              <div className='flex flex-col'>
                <span>{transaction?.traderTeamName}</span>
                <span className='text-2xs mt-1 text-zinc-600 dark:text-zinc-400'>
                  Traded away
                </span>
                <div className='flex flex-col font-normal'>
                  {fromTrader?.map((player) => (
                    <div
                      key={player?.playerId}
                      className='inline-flex items-center gap-1 flex-wrap'
                    >
                      <span>
                        {formatPlayerName({
                          name: player?.name,
                          format: 'short',
                        })}
                      </span>
                      <div className='flex items-center gap-1 text-2xs pt-[2px] text-zinc-600 dark:text-zinc-400'>
                        <span className=''>{player?.displayPosition}</span>
                        <span className='uppercase'>
                          {player?.editorialTeamAbbr}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tradee */}
              <div className='flex flex-col'>
                <span>{transaction?.tradeeTeamName}</span>
                <span className='text-2xs mt-1 text-zinc-600 dark:text-zinc-400'>
                  Traded away
                </span>
                <div className='flex flex-col font-normal'>
                  {toTrader?.map((player) => (
                    <div
                      key={player?.playerId}
                      className='inline-flex items-center gap-1 flex-wrap'
                    >
                      <span>
                        {formatPlayerName({
                          name: player?.name,
                          format: 'short',
                        })}
                      </span>
                      <div className='flex items-center gap-1 text-2xs pt-[2px] text-zinc-600 dark:text-zinc-400'>
                        <span className=''>{player?.displayPosition}</span>
                        <span className='uppercase'>
                          {player?.editorialTeamAbbr}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAAB Spent */}
        {transaction?.faabBid && (
          <div>
            <span className='text-red-700 dark:text-red-400 whitespace-nowrap'>
              ${transaction?.faabBid}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionCard
