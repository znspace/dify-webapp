import cn from 'classnames'
import Textarea from 'rc-textarea'
import type { FC } from 'react'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import s from '../style.module.css'
import Button from '@/app/components/base/button'
import { StopCircle } from '@/app/components/base/icons/line/mediaAndDevices'
import ChatImageUploader from '@/app/components/base/image-uploader/chat-image-uploader'
import { useImageFiles } from '@/app/components/base/image-uploader/hooks'
import ImageList from '@/app/components/base/image-uploader/image-list'
import Toast from '@/app/components/base/toast'
import Tooltip from '@/app/components/base/tooltip'
import type { VisionFile, VisionSettings } from '@/types/app'
import { TransferMethod } from '@/types/app'

type IOperationProps = {
  isMobile: boolean
  checkCanSend?: () => boolean
  onSend?: (message: string, files: VisionFile[]) => void
  onStopResponding?: () => void
  isResponding?: boolean
  visionConfig?: VisionSettings
}

const Operation: FC<IOperationProps> = ({
  isMobile,
  checkCanSend,
  onSend = () => { },
  onStopResponding = () => { },
  isResponding,
  visionConfig,
}) => {
  const { t } = useTranslation()
  const isUseInputMethod = useRef(false)
  const [query, setQuery] = React.useState('')
  const { notify } = Toast

  const {
    files,
    onUpload,
    onRemove,
    onReUpload,
    onImageLinkLoadError,
    onImageLinkLoadSuccess,
    onClear,
  } = useImageFiles()
  const logError = (message: string) => {
    notify({ type: 'info', message, duration: 3000 })
  }
  const valid = () => {
    if (!query || query.trim() === '') {
      logError('请输入提问内容')
      return false
    }
    return true
  }

  const handleContentChange = (e: any) => {
    const value = e.target.value
    setQuery(value)
  }

  const handleSend = () => {
    if (!valid() || (checkCanSend && !checkCanSend()))
      return
    onSend(query, files.filter(file => file.progress !== -1).map(fileItem => ({
      type: 'image',
      transfer_method: fileItem.type,
      url: fileItem.url,
      upload_file_id: fileItem.fileId,
    })))
    if (!files.find(item => item.type === TransferMethod.local_file && !item.fileId)) {
      if (files.length)
        onClear()
      if (!isResponding)
        setQuery('')
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey && !isUseInputMethod.current)
        handleSend()
    }
  }

  const handleKeyDown = (e: any) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setQuery(query.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  return (
    <div
      className={cn('!left-3.5 !right-3.5', 'absolute z-10 bottom-0 left-0 right-0')}>
      {
        isResponding && (
          <div className='flex justify-center mb-2'>
            <Button onClick={onStopResponding}>
              <StopCircle className='mr-[5px] w-3.5 h-3.5 text-gray-500' />
              <span className='text-xs text-gray-500 font-normal'>停止响应</span>
            </Button>
          </div>
        )
      }

      <div className='flex items-center mt-2 gap-2'>
        <div className='flex-1 p-[5.5px] max-h-[150px] bg-white border-[1.5px] border-gray-200 rounded-full overflow-y-auto relative'>
          {
            visionConfig?.enabled && (
              <>
                <div className='absolute bottom-2 left-2 flex items-center'>
                  <ChatImageUploader
                    settings={visionConfig}
                    onUpload={onUpload}
                    disabled={files.length >= visionConfig.number_limits}
                  />
                  <div className='mx-1 w-[1px] h-4 bg-black/5' />
                </div>
                <div className='pl-[52px]'>
                  <ImageList
                    list={files}
                    onRemove={onRemove}
                    onReUpload={onReUpload}
                    onImageLinkLoadSuccess={onImageLinkLoadSuccess}
                    onImageLinkLoadError={onImageLinkLoadError}
                  />
                </div>
              </>
            )
          }
          <Textarea
            className={`
              block w-full px-2 pr-[118px] py-[7px] leading-5 max-h-none text-sm text-gray-700 outline-none appearance-none resize-none
              ${visionConfig?.enabled && 'pl-12'}
            `}
            value={query}
            onChange={handleContentChange}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            autoSize
          />
          <div className="absolute bottom-2 right-2 flex items-center h-8">
            {isMobile
              ? <div className={`${s.sendBtn} w-8 h-8 cursor-pointer rounded-md`} onClick={handleSend}></div>
              : <Tooltip
                selector='send-tip'
                htmlContent={
                  <div>
                    <div>{t('common.operation.send')} Enter</div>
                    <div>{t('common.operation.lineBreak')} Shift Enter</div>
                  </div>
                }
              >
                <div className={`${s.sendBtn} w-8 h-8 cursor-pointer rounded-md`} onClick={handleSend}></div>
              </Tooltip>}
          </div>
        </div>

        {/* <Button onClick={onStopResponding} className='btn-primary'>
          <StopCircle className='mr-[5px] w-3.5 h-3.5 text-gray-500' />
        </Button> */}
      </div>

    </div>
  )
}

export default React.memo(Operation)
