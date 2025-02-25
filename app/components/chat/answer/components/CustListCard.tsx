import { useRequest } from 'ahooks'
import type { FC } from 'react'
import React from 'react'

import LoadingAnim from '../../loading-anim'

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
]

async function postData(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST', // 指定请求方法为 POST
    headers: {
      'Content-Type': 'application/json', // 设置请求头，指定内容类型为 JSON
      'sid': localStorage.getItem('HWM_bss.sid') || '',
    },
    body: JSON.stringify(data), // 将数据转换为 JSON 字符串
  })

  if (!response.ok)
    throw new Error(`HTTP error! status: ${response.status}`)

  const res = await response.json() // 解析响应为 JSON

  if (res.success)
    return res.data

  throw new Error(res.message)
}

type ICustListCardProps = {
  content: string
  onSend: (message: string, file?: any, extra?: Record<string, any>) => any
}

const CustListCard: FC<ICustListCardProps> = ({ content, onSend }) => {
  const { data, loading } = useRequest(() =>
    postData('http://bss2.dev.harvestwm.cn/advisor/api/v3/cust/filter/search', {
      pageNo: 1,
      pageSize: 3,
      custBaseReq: {
        provinceCode: [],
        cityCode: [],
        assetReq: { assetDate: '' },
        profitReq: { profitStartDate: '', profitEndDate: '' },
        positionReq: { fundSelectReq: {} },
        mgrFilterReq: {},
      },
      fundProfitReq: { fundSelectReq: {}, profitSelectReq: { profitStartDate: '', profitEndDate: '' } },
      sortBy: 'asset',
      isAsc: false,
    }), {})
  console.log('🚀 ~ data:', data)

  const handleSelectCust = (cust: any) => {
    console.log('🚀 ~ handleSelectCust:', content)
    onSend(`客户${cust.custName}的持仓检视`, {}, { custNo: cust.custNo })
  }

  if (loading) {
    return <div className='flex items-center justify-center w-6 h-5'>
      <LoadingAnim type='text' />
    </div>
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data?.list?.map(({ baseInfo }) => (
        <li key={baseInfo?.custNo} className="flex justify-between gap-x-6 py-5" onClick={() => handleSelectCust(baseInfo)}>
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{baseInfo?.custName}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{baseInfo?.mgrName}</p>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{baseInfo.totalAsset}</p>
            <p className="text-sm/6 text-gray-900">{baseInfo.totalProfit}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(CustListCard)
