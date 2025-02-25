import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import cn from 'classnames'
import { useState } from 'react'

const solutions = [
  { name: '查产品', description: '您的产品助理', id: '#', icon: ChartPieIcon },
  { name: '查客户', description: '分析客户', id: '#', icon: CursorArrowRaysIcon },
  { name: '查业务规则', description: '', id: '#', icon: FingerPrintIcon },
  { name: '查资讯', description: '', id: '#', icon: SquaresPlusIcon },
]

export default function FlyoutMenu() {
  const [active, setActive] = useState('查产品')

  const handleClickMenu = (name: string) => {
    setActive(name)
  }

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
        <span>{active}</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[enter]:ease-out data-[leave]:duration-150 data-[leave]:ease-in"
      >
        {({ close }) => (
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
            <div className="p-4">
              {solutions.map(item => (
                <div key={item.name} className={cn(active === item.name && 'bg-gray-50', 'group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50')} onClick={() => {
                  handleClickMenu(item.name)
                  close()
                }}>
                  <div className={cn(active === item.name && 'bg-white', 'mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white')}>
                    <item.icon aria-hidden="true" className={cn(active === item.name && 'text-indigo-600', 'size-6 text-gray-600 group-hover:text-indigo-600')} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </div>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  )
}
