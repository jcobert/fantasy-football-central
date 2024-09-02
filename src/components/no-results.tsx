import { FC, ReactNode } from 'react'

type Props = {
  title?: ReactNode
  subtitle?: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

const NoResults: FC<Props> = ({
  title = 'No results',
  subtitle = '',
  description = '',
  actions,
}) => {
  return (
    <div className='flex flex-col w-full gap-3 text-center prose text-balance mx-auto'>
      <div className='flex flex-col items-center gap-1 font-medium'>
        {title ? <span className='text-lg'>{title}</span> : null}
        {subtitle ? <span>{subtitle}</span> : null}
      </div>

      {description ? (
        <div>
          <span className='text-pretty'>{description}</span>
        </div>
      ) : null}

      {actions ? actions : null}
    </div>
  )
}

export default NoResults
