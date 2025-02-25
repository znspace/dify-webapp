'use client'
import type { FC } from 'react'
import React from 'react'
import s from '../style.module.css'
import type { IChatItem } from '../type'

import ImageGallery from '@/app/components/base/image-gallery'
import { Markdown } from '@/app/components/base/markdown'

type IQuestionProps = Pick<IChatItem, 'id' | 'content'> & {
  imgSrcs?: string[]
}

const Question: FC<IQuestionProps> = ({ id, content, imgSrcs }) => {
  return (
    <div className='flex items-start justify-end' key={id}>
      <div>
        <div className={`${s.question} relative text-sm text-gray-900`}>
          <div
            className={'mr-2 py-3 px-4 bg-blue-500 rounded-tl-2xl rounded-b-2xl'}
          >
            {imgSrcs && imgSrcs.length > 0 && (
              <ImageGallery srcs={imgSrcs} />
            )}
            <Markdown content={content} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default React.memo(Question)
