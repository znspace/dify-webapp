'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  PencilIcon,
} from '@heroicons/react/24/solid'
import s from './style.module.css'
import type { AppInfo } from '@/types/app'
import Button from '@/app/components/base/button'

export const AppInfoComp: FC<{ siteInfo: AppInfo }> = ({ siteInfo }) => {
  const { t } = useTranslation()
  return (
    <div>
      <div className='flex items-center py-2 text-xl font-medium text-gray-700 rounded-md'>👏 {t('app.common.welcome')} {siteInfo.title}</div>
      <p className='text-sm text-gray-500'>{siteInfo.description}</p>
    </div>
  )
}

export const PromptTemplate: FC<{ html: string }> = ({ html }) => {
  return (
    <div
      className={' box-border text-sm text-gray-700'}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}

export const ChatBtn: FC<{ onClick: () => void; className?: string }> = ({
  className,
  onClick,
}) => {
  const { t } = useTranslation()
  return (
    <Button
      type='primary'
      className={cn(className, `space-x-2 flex items-center ${s.customBtn}`)}
      onClick={onClick}>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5C18 14.366 14.418 17.5 10 17.5C8.58005 17.506 7.17955 17.1698 5.917 16.52L2 17.5L3.338 14.377C2.493 13.267 2 11.934 2 10.5C2 6.634 5.582 3.5 10 3.5C14.418 3.5 18 6.634 18 10.5ZM7 9.5H5V11.5H7V9.5ZM15 9.5H13V11.5H15V9.5ZM9 9.5H11V11.5H9V9.5Z" fill="white" />
      </svg>
      {t('app.chat.startChat')}
    </Button>
  )
}

export const EditBtn = ({ className, onClick }: { className?: string; onClick: () => void }) => {
  const { t } = useTranslation()

  return (
    <div
      className={cn('px-2 flex space-x-1 items-center rounded-md  cursor-pointer', className)}
      onClick={onClick}
    >
      <PencilIcon className='w-3 h-3' />
      <span>{t('common.operation.edit')}</span>
    </div>
  )
}

export const FootLogo = () => (
  <div className={s.logo} />
)
