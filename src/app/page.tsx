// src/app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [price, setPrice] = useState(10230.54)

  useEffect(() => {
    const timer = setInterval(() => {
      const simulated = 9500 + Math.random() * 1000
      setPrice(parseFloat(simulated.toFixed(2)))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
        거래소 수수료 <br />
        <span className="text-blue-500">돌려받고</span> 자동으로 굴리세요.
      </h1>

      <p className="text-sm text-gray-400 mb-4">
        테더 결제 시 <span className="text-yellow-400">리워드 적립</span> +{' '}
        <span className="text-orange-400">AI 자동매매</span>로 수익까지.
      </p>

      <p className="text-sm text-gray-300 mb-4">
        현재 시세: <span className="text-yellow-300">{price.toFixed(2)} USDT</span>
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={() => router.push('/rewards')}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-full"
        >
          리워드 보기
        </button>
        <button
          onClick={() => router.push('/bot')}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-full"
        >
          자동매매 설정
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-full"
        >
          대시보드
        </button>
        <button
          onClick={() => router.push('/insight')}
          className="px-5 py-2 bg-orange-600 hover:bg-orange-700 rounded-full"
        >
          미상장 탐지
        </button>
      </div>
    </main>
  )
}
