import TransactionCard from './transaction-card'
import { FC } from 'react'

import { forceArray } from '@/utils/array'
import { cn } from '@/utils/style'
import { Transaction } from '@/utils/yahoo/types/common'

type Props = {
  transactions?: Transaction[]
  limit?: number
  className?: string
}

const Transactions: FC<Props> = ({
  transactions = [],
  limit,
  className = '',
}) => {
  const data = forceArray(transactions)

  return (
    <div className='flex w-full flex-col gap-6 py-2__ sm:px-8_ md:px-24_'>
      <div
        className={cn(
          'flex flex-col gap-2 bg-zinc-50__ dark:bg-zinc-700 p-2 rounded-md border dark:border-zinc-400 shadow-sm overflow-auto',
          className,
        )}
      >
        {!!data?.length
          ? data
              ?.slice(0, limit)
              ?.map((tr) => (
                <TransactionCard key={tr?.transactionId} transaction={tr} />
              ))
          : null}
      </div>
    </div>
  )
}

export default Transactions
