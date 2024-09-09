// import Transactions from '../../(transactions)/transactions'
import { round } from 'lodash'
import { FC, useState } from 'react'

import { forceArray } from '@/utils/array'
import { cn } from '@/utils/style'
import { getAverageMatchupGrade } from '@/utils/yahoo/matchup'
import { Team, Transaction, TransactionType } from '@/utils/yahoo/types/common'

import Modal from '@/components/common/modal'
import Record from '@/components/features/team/record'

const Skeleton = (
  <div className='w-16 h-3 rounded-full bg-zinc-400/50 animate-pulse' />
)

type Props = {
  team?: Team
}

const TeamOverview: FC<Props> = ({ team }) => {
  const [isTransModalOpen, setIsTransModalOpen] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([])

  const pointsFor = team?.teamStandings?.pointsFor
  const pointsAgainst = team?.teamStandings?.pointsAgainst
  const pointDifferential = round((pointsFor ?? 0) - (pointsAgainst ?? 0), 2)

  const allTransactions = forceArray(team?.transactions?.transaction || [])
  const trades = allTransactions?.filter(
    (trans) => trans?.type === TransactionType.Trade,
  )
  const gpa = getAverageMatchupGrade(team?.matchups, team?.teamKey) ?? '--'

  return (
    <div className='flex flex-col gap-2 text-sm p-4 border border-t-0 rounded-t-none rounded-md border-zinc-300__ bg-zinc-50__ dark:border-zinc-500 dark:bg-zinc-600'>
      {/* Record */}
      <div>
        <h3 className='mb-1 font-medium border-b border-zinc-300 dark:border-zinc-500'>
          Record
        </h3>
        {/* League */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[4rem]_'>Overall:</span>
          {team ? <Record teamKey={team?.teamKey} size='sm' /> : Skeleton}
        </div>
        {/* Division */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[4rem]_'>Division:</span>
          {team ? (
            <Record teamKey={team?.teamKey} division size='sm' />
          ) : (
            Skeleton
          )}
        </div>
        {/* GPA */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[4rem]_'>GPA:</span>
          {team ? gpa : Skeleton}
        </div>
      </div>

      {/* Points */}
      <div>
        <h3 className='mb-1 font-medium border-b border-zinc-300 dark:border-zinc-500'>
          Points
        </h3>
        {/* For */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[5.25rem]_'>For:</span>
          {team ? (
            <span className=''>{pointsFor?.toLocaleString() ?? '0'}</span>
          ) : (
            Skeleton
          )}
        </div>
        {/* Against */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[5.25rem]_'>Against:</span>
          {team ? (
            <span className=''>{pointsAgainst?.toLocaleString() ?? '0'}</span>
          ) : (
            Skeleton
          )}
        </div>
        {/* Differential */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[5.25rem]_'>Differential:</span>
          {team ? (
            <span
              className={cn({
                'text-rose-800 dark:text-red-400': pointDifferential < 0,
                "text-emerald-800 dark:text-emerald-500 before:content-['+']":
                  pointDifferential > 0,
              })}
            >
              {pointDifferential?.toLocaleString()}
            </span>
          ) : (
            Skeleton
          )}
        </div>
      </div>

      {/* Roster Moves */}
      <div>
        <h3 className='mb-1 font-medium border-b border-zinc-300 dark:border-zinc-500'>
          Transactions
        </h3>
        {/* Moves */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[3rem]_'>Moves:</span>
          {team ? (
            <button
              type='button'
              className='underline underline-offset-2 decoration-1 decoration-dotted'
              onClick={() => {
                setFilteredTransactions(allTransactions)
                setIsTransModalOpen(true)
              }}
            >
              {team?.numberOfMoves}
            </button>
          ) : (
            Skeleton
          )}
        </div>
        {/* Trades */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[3rem]_'>Trades:</span>
          {team ? (
            <button
              type='button'
              className='underline underline-offset-2 decoration-1 decoration-dotted'
              onClick={() => {
                setFilteredTransactions(trades)
                setIsTransModalOpen(true)
              }}
            >
              {team?.numberOfTrades}
            </button>
          ) : (
            Skeleton
          )}
        </div>
      </div>

      {/* Waiver/FA */}
      <div>
        <h3 className='mb-1 font-medium border-b border-zinc-300 dark:border-zinc-500'>
          Free Agency
        </h3>
        {/* FAAB Balance */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[7rem]_'>FAAB Balance:</span>
          {team ? <span className=''>${team?.faabBalance}</span> : Skeleton}
        </div>
        {/* Priority */}
        <div className='flex items-center gap-2'>
          <span className='min-w-[7rem]_'>Waiver Priority:</span>
          {team ? <span className=''>{team?.waiverPriority}</span> : Skeleton}
        </div>
      </div>

      {/* <Modal isOpen={isTransModalOpen} setIsOpen={setIsTransModalOpen}>
        <Transactions transactions={filteredTransactions} className='h-full' />
      </Modal> */}
    </div>
  )
}

export default TeamOverview
