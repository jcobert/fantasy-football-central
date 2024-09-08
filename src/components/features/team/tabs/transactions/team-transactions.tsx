import { FC } from 'react'

import { forceArray } from '@/utils/array'
import { Transaction } from '@/utils/yahoo/types/common'

import Button from '@/components/common/button'
import Transactions from '@/components/features/team/tabs/transactions/transactions'
import NoResults from '@/components/no-results'

type Props = {
  transactions?: Transaction[]
}

const TeamTransactions: FC<Props> = ({ transactions }) => {
  if (!forceArray(transactions)?.length)
    return (
      <div className='mt-10'>
        <NoResults
          title='No Activity'
          description='Team transactions will appear here.'
        />
      </div>
    )

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <span className='text-lg font-semibold'>Recent Transactions</span>
        <Transactions transactions={transactions} limit={5} />
      </div>

      <div className='w-full mt-4'>
        <Button
          // className='w-fit mx-auto max-sm:w-full text-center justify-center flex items-center border gap-1 !px-8 !py-3 !border-zinc-300 bg-zinc-100 hover:bg-zinc-200 rounded-md text-sky-700 dark:text-sky-700 dark:hover:text-sky-800 hover:text-sky-800 transition font-medium'
          className='btn-outline mx-auto'
          // onClick={() => setIsTransModalOpen(true)}
        >
          View all transactions
        </Button>
      </div>
    </div>
  )
}

export default TeamTransactions
