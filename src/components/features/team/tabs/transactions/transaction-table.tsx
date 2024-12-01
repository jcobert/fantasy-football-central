import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { partition } from 'lodash'
import { FC, useMemo } from 'react'
import { AiOutlineSwap } from 'react-icons/ai'
import {
  PiMinusBold,
  PiMinusCircleBold,
  PiPlusBold,
  PiPlusCircleBold,
  PiPlusMinus,
  PiPlusMinusBold,
  PiSwap,
} from 'react-icons/pi'

import { forceArray } from '@/utils/array'
import {
  Transaction,
  TransactionPlayer,
  TransactionType,
} from '@/utils/yahoo/types/common'

type Props = {
  data: Transaction[]
}

type TransactionTableData = {}

const TransactionTable: FC<Props> = ({ data = [] }) => {
  const columnHelper = createColumnHelper<Transaction>()

  const formatPlayerData = (transaction: Transaction) => {
    const players = forceArray(transaction?.players?.player) || []
    // let singlePlayer = players?.length === 1;

    let added: TransactionPlayer[] = []
    let dropped: TransactionPlayer[] = []
    let fromTrader: TransactionPlayer[] = []
    let toTrader: TransactionPlayer[] = []
    let summary = ''
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
          // summary = `${transaction?.traderTeamName} gives: ${fromTrader
          //   ?.map((p) => p?.name?.full)
          //   ?.join(", ")} to ${transaction?.tradeeTeamName}.\n${
          //   transaction?.traderTeamName
          // } receives: ${toTrader?.map((p) => p?.name?.full)?.join(", ")} from ${
          //   transaction?.tradeeTeamName
          // }`;
        }
        break
      default:
        break
    }
    // return summary;
    // return { added, dropped, fromTrader, toTrader };
  }

  const columns = useMemo(() => {
    return [
      // Date
      columnHelper.accessor('timestamp', {
        id: 'timestamp',
        header: 'Date',
        cell: (data) => <span>{format(data.getValue() * 1000, 'M/d')}</span>,
      }),

      // Transaction Type
      columnHelper.accessor('type', {
        id: 'type',
        header: 'Type',
        cell: (data) => {
          let icon: JSX.Element | null = null
          switch (data?.getValue()) {
            case TransactionType.Add:
              icon = (
                <PiPlusBold className='text-green-700 dark:text-green-500' />
              )
              break
            case TransactionType.Drop:
              icon = <PiMinusBold className='text-red-700 dark:text-red-500' />
              break
            case TransactionType.AddDrop:
              icon = (
                <PiPlusMinus className='text-lg text-zinc-600 dark:text-zinc-300' />
              )
              break
            case TransactionType.Trade:
              // icon = <PiSwap />;
              icon = (
                <AiOutlineSwap className='text-sky-600 dark:text-sky-500 text-lg' />
              )
              break
            default:
              break
          }
          return <div className='flex justify-center'>{icon}</div>
        },
      }),

      // FAAB Bid
      columnHelper.accessor('faabBid', {
        id: 'faabBid',
        header: 'Bid',
        cell: (data) =>
          !data?.getValue() ? null : (
            <div className='flex justify-center'>
              <span>$</span>
              <span>{data?.getValue()}</span>
            </div>
          ),
      }),

      // Trading Team
      columnHelper.accessor('traderTeamName', {
        id: 'traderTeamName',
        header: 'Trader',
        cell: (data) =>
          !data?.getValue() ? null : (
            <div className='flex justify-center'>
              <span>{data?.getValue()}</span>
            </div>
          ),
      }),

      // Trade Recipient
      columnHelper.accessor('tradeeTeamName', {
        id: 'tradeeTeamName',
        header: 'Recipient',
        cell: (data) =>
          !data?.getValue() ? null : (
            <div className='flex justify-center'>
              <span>{data?.getValue()}</span>
            </div>
          ),
      }),

      // Players
      columnHelper.accessor('players.player', {
        id: 'players',
        header: 'Details',
        cell: (data) => (
          <div className=''>
            {/* <span>{data?.getValue()?.playerKey}</span> */}
          </div>
        ),
      }),

      // Status
      // columnHelper.accessor("status", {
      //   id: "status",
      //   header: "Status",
      //   cell: (data) => <span>{data?.getValue()}</span>,
      // }),
    ]
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className='text-sm md:text-base'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-2 border-collapse border border-zinc-300 dark:border-zinc-500'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-2 border-collapse border border-zinc-300 dark:border-zinc-500'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

export default TransactionTable
