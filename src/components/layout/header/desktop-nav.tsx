'use client'

import NavLink from '../nav-link'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { FC } from 'react'
import { FaAngleDown } from 'react-icons/fa6'

import { cn } from '@/utils/style'

import { navItems } from '@/configuration/nav'

const DesktopNav: FC = () => {
  return (
    <NavigationMenu.Root
      className='z-[1] flex justify-center'
      delayDuration={50}
    >
      <NavigationMenu.List className='items-center m-0 flex gap-1 list-none rounded-[6px] p-1'>
        {navItems
          ?.filter((item) => !item?.hidden)
          ?.map((item) => {
            const linkCount =
              item?.menu?.links?.filter((link) => !link?.hidden)?.length || 0
            const hasMenu = !!linkCount
            return (
              <NavigationMenu.Item key={item?.id}>
                {!hasMenu ? (
                  <NavLink
                    className='text-brand-gray-dark transition hover:bg-brand/10 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline data-[active]:text-brand'
                    href={item?.url}
                  >
                    {item?.name}
                  </NavLink>
                ) : (
                  <>
                    <NavigationMenu.Trigger className='text-brand-gray-dark hover:border-y-brand/10 group flex select-none items-center justify-between gap-1 rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none data-[state=open]:text-brand__ group'>
                      <span>{item?.name}</span>
                      <FaAngleDown className='text-2xs group-data-[state=open]:rotate-180 transition duration-75' />
                    </NavigationMenu.Trigger>
                    <div className='perspective-[2000px] absolute top-full flex justify-center w-[var(--radix-navigation-menu-viewport-width)]'>
                      <NavigationMenu.Content className='relative mt-4 data-[state=open]:animate-scaleIn shadow-xl data-[state=closed]:animate-scaleOut h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-auto rounded-[6px] bg-white transition-[width,_height] duration-300 w-[var(--radix-navigation-menu-viewport-width)] max-h-[70dvh]'>
                        {/* Menu title */}
                        <p className='text-xl -mb-1 px-[22px] mt-[10px] text-brand-gray-medium'>
                          {item?.name}
                        </p>
                        {/* Links */}
                        <ul className='m-0 grid list-none gap-x-[10px] gap-y-2 pt-4 p-[22px] grid-cols-[0.75fr_1fr]'>
                          {/* Menu Image */}
                          {!!item?.menu?.img?.src && (
                            <>
                              {item?.url ? (
                                <NavLink
                                  href={item?.url}
                                  className={cn([
                                    'object-cover object-center rounded min-[840px]:min-w-48 group',
                                    linkCount <= 3 && 'row-span-3',
                                    linkCount === 4 && 'row-span-4',
                                    linkCount === 5 && 'row-span-5',
                                    linkCount === 6 && 'row-span-6',
                                    linkCount === 7 && 'row-span-7',
                                    linkCount >= 8 && 'row-span-8',
                                  ])}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                                  <img
                                    className={cn([
                                      'object-cover object-center h-full w-full min-w-36 rounded',
                                    ])}
                                    {...item?.menu?.img}
                                  />
                                  <div className='text-brand-gray-light text-center flex flex-col relative -top-full opacity-0 group-hover:opacity-100 h-full rounded transition-opacity bg-almost-black/70 justify-center font-medium'>
                                    <span>View All</span>
                                    <span>{item?.name}</span>
                                  </div>
                                </NavLink>
                              ) : (
                                <div
                                  className={cn([
                                    'object-cover object-center rounded min-[840px]:min-w-48 group',
                                    item?.menu?.links?.filter(
                                      (link) => !link?.hidden,
                                    )?.length <= 3 && 'row-span-3',
                                    item?.menu?.links?.length === 4 &&
                                      'row-span-4',
                                    item?.menu?.links?.length === 5 &&
                                      'row-span-5',
                                    item?.menu?.links?.length === 6 &&
                                      'row-span-6',
                                    item?.menu?.links?.length === 7 &&
                                      'row-span-7',
                                    item?.menu?.links?.length >= 8 &&
                                      'row-span-8',
                                  ])}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                                  <img
                                    className={cn([
                                      'object-cover object-center h-full w-full min-w-36 rounded',
                                    ])}
                                    {...item?.menu?.img}
                                  />
                                </div>
                              )}
                            </>
                          )}
                          {item?.menu?.links
                            ?.filter((link) => !link?.hidden)
                            ?.map((subItem) => (
                              <NavigationMenu.Item
                                key={`${item?.id}.${subItem?.id}`}
                                className={cn([
                                  !item?.menu?.img?.src && 'col-span-full',
                                ])}
                              >
                                <NavLink
                                  href={subItem?.url}
                                  className='text-brand-gray-dark h-full transition hover:bg-brand/10 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline'
                                >
                                  <div className='flex flex-col gap-2'>
                                    <span
                                      className={cn([
                                        'text-nowrap whitespace-nowrap font-semibold',
                                        !subItem?.description &&
                                          'min-[840px]:min-w-48',
                                      ])}
                                    >
                                      {subItem?.name}
                                    </span>
                                    {!!subItem?.description && (
                                      <p className='font-normal text-brand-gray-medium text-pretty min-[840px]:min-w-72__'>
                                        {subItem?.description}
                                      </p>
                                    )}
                                  </div>
                                </NavLink>
                              </NavigationMenu.Item>
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </div>
                  </>
                )}
              </NavigationMenu.Item>
            )
          })}

        <NavigationMenu.Indicator className='data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
          <div className='relative h-[2px] w-10 rounded bg-brand/20' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

export default DesktopNav
