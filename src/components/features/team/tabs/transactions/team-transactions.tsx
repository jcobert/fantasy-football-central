import { FC, useState } from 'react'

import { forceArray } from '@/utils/array'
import { Transaction } from '@/utils/yahoo/types/common'

import Button from '@/components/common/button'
import Modal from '@/components/common/modal'
import Transactions from '@/components/features/team/tabs/transactions/transactions'
import NoResults from '@/components/no-results'

type Props = {
  transactions?: Transaction[]
}

const TeamTransactions: FC<Props> = ({ transactions }) => {
  const [isTransModalOpen, setIsTransModalOpen] = useState(false)

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
          className='btn-outline mx-auto'
          onClick={() => setIsTransModalOpen(true)}
        >
          View all transactions
        </Button>
      </div>

      <Modal isOpen={isTransModalOpen} setIsOpen={setIsTransModalOpen}>
        <Transactions transactions={transactions} className='h-full' />
      </Modal>
    </div>
  )
}

export default TeamTransactions
