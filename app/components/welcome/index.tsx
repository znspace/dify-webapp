'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import type { AppInfo, PromptConfig } from '@/types/app'

// regex to match the {{}} and replace it with a span
const regex = /\{\{([^}]+)\}\}/g

export type IWelcomeProps = {
  conversationName: string
  hasSetInputs: boolean
  isPublicVersion: boolean
  siteInfo: AppInfo
  promptConfig: PromptConfig
  onStartChat: (inputs: Record<string, any>) => void
  canEditInputs: boolean
  savedInputs: Record<string, any>
  onInputsChange: (inputs: Record<string, any>) => void
  onSend: (message: string, files: any[]) => void
}

const Welcome: FC<IWelcomeProps> = ({
  conversationName,
  hasSetInputs,
  onSend,
  siteInfo,
  promptConfig,
  onStartChat,
  savedInputs,
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>((() => {
    if (hasSetInputs)
      return savedInputs

    const res: Record<string, any> = {}
    if (promptConfig) {
      promptConfig.prompt_variables.forEach((item) => {
        res[item.key] = ''
      })
    }
    return res
  })())
  useEffect(() => {
    if (!savedInputs) {
      const res: Record<string, any> = {}
      if (promptConfig) {
        promptConfig.prompt_variables.forEach((item) => {
          res[item.key] = ''
        })
      }
      setInputs(res)
    }
    else {
      setInputs(savedInputs)
    }
  }, [savedInputs])

  const renderHeader = () => {
    return (
      <div className='absolute top-0 left-0 right-0 flex items-center justify-between border-b border-gray-100 mobile:h-12 tablet:h-16 px-8 bg-white'>
        <div className='text-gray-900'>{conversationName}</div>
      </div>
    )
  }

  const features = [
    {
      name: '查产品',
      description:
        '最近开放的产品有哪些？',
    },
    {
      name: '查客户',
      description:
        '客户持仓检视',
    },
    {
      name: '问业务规则',
      description:
        '最近的政策与数据解读',
    },
  ]

  return (
    <div className='relative'>

      {/* {hasSetInputs && renderHeader()} */}

      <div className='mx-auto pc:w-[794px] max-w-full mobile:w-full px-3.5'>
        {/*  Has't set inputs  */}
        {!hasSetInputs && <div className="min-h-20 bg-white rounded-lg shadow-lg mx-auto max-w-2xl pc:mt-24 mobile:mt-5 p-2">

          <div className="text-lg font-semibold mb-4">
            Hi~，我是你的小助理
          </div>
          <div className="text-sm">
            {siteInfo.description}
          </div>
          <div className='mb-2 mt-2 border-b-2 border-dotted'></div>
          <div className="text-xs text-gray-500 mb-3">
            你可以这样问
          </div>
          <div className='flex flex-col gap-3'>
            {features.map(feature => (
              <div key={feature.name} className='p-2 rounded-lg text-blue-600 bg-gray-200 text-sm' onClick={() => {
                onStartChat(inputs)
                setTimeout(() => {
                  onSend(feature.description, [])
                }, 100)
              }}>
                {feature.description}
              </div>
            ))}
          </div>
        </div>}
      </div>
    </div >
  )
}

export default React.memo(Welcome)
