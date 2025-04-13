'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

interface MarketData {
  symbol: string
  binancePrice: number
  bybitPrice: number
  spread: number | null
}

export default function MarketDetailPage() {
  const searchParams = useSearchParams()
  const symbol = searchParams?.get('symbol') || ''  // ✅ null-safe 처리

  const [data, setData] = useState<MarketData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/markets/${symbol}`)
        setData(res.data as MarketData) // ✅ 타입 명시로 오류 제거
      } catch (err) {
        console.error('시세 가져오기 실패:', err)
      }
    }

    if (symbol) fetchData()
  }, [symbol])

  if (!data) {
    return <div className="p-6 text-white bg-black min-h-screen">로딩 중...</div>
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🪙 {data.symbol} 시세 상세</h1>
      <ul className="text-sm space-y-2">
        <li><strong>바이낸스 가격:</strong> {data.binancePrice}</li>
        <li><strong>바이비트 가격:</strong> {data.bybitPrice}</li>
        <li><strong>스프레드:</strong> {data.spread ?? 'N/A'}</li>
      </ul>
    </div>
  )
}
