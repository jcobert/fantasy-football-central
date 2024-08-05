import { FC, ReactNode } from 'react'

import { cn } from '@/utils/style'

import Heading from '@/components/layout/heading'

export type PageLayoutProps = {
  heading?: string | JSX.Element
  children: ReactNode
  className?: string
  defaultLayout?: boolean
  mainClassName?: string
  backgroundImage?: string
  pageClassName?: string
}

const PageLayout: FC<PageLayoutProps> = ({
  heading,
  children,
  className = '',
  defaultLayout = true,
  mainClassName = '',
  backgroundImage,
  pageClassName = '',
}) => {
  const pageHeading =
    typeof heading === 'string' ? <Heading text={heading} /> : heading

  return (
    <main className={cn(['min-h-page-mobile sm:min-h-page', mainClassName])}>
      {backgroundImage ? (
        <div
          className='absolute h-[100dvh] mt-[calc(var(--frame-mobile)*-1)] sm:mt-[calc(var(--frame)*-1)] w-full bg-fixed bg-no-repeat bg-cover bg-center before:absolute before:w-full before:h-[100dvh] before:bg-[#0000006c]'
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : null}

      <div
        className={cn([
          'items-center justify-start w-screen__ pb-safe',
          !!backgroundImage && 'relative',
        ])}
      >
        <div
          className={cn([
            'flex flex-col gap-2 min-h-page-mobile sm:min-h-page',
            defaultLayout && 'layout pt-8 md:pt-16 pb-8',
            pageClassName,
          ])}
        >
          {heading ? pageHeading : null}

          <div className={cn(['mt-6', className])}>{children}</div>
        </div>
      </div>
    </main>
  )
}

export default PageLayout
