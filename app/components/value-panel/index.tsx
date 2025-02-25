'use client'
import type { FC, ReactNode } from 'react'
import React from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'
import Button from '@/app/components/base/button'

export type ITemplateVarPanelProps = {
  className?: string
  header: ReactNode
  children?: ReactNode | null
  isFold: boolean
}

const TemplateVarPanel: FC<ITemplateVarPanelProps> = ({
  className,
  header,
  children,
}) => {
  return (
    <div className={cn(className, 'rounded-xl shadow-lg')}>
      {/* body */}
      {children && (
        <div className='rounded-b-xl p-6'>
          {children}
        </div>
      )}
    </div>
  )
}

export const PanelTitle: FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => {
  return (
    <div className={cn(className, 'flex items-center space-x-1 text-indigo-600')}>
      <span className='text-xs'>{title}</span>
    </div>
  )
}

export const VarOpBtnGroup: FC<{ className?: string; onConfirm: () => void; onCancel: () => void }> = ({
  className,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation()

  return (
    <div className={cn(className, 'flex mt-3 space-x-2 mobile:ml-0 tablet:ml-[128px] text-sm')}>
      <Button
        className='text-sm'
        type='primary'
        onClick={onConfirm}
      >
        {t('common.operation.save')}
      </Button>
      <Button
        className='text-sm'
        onClick={onCancel}
      >
        {t('common.operation.cancel')}
      </Button>
    </div >
  )
}

export default React.memo(TemplateVarPanel)
