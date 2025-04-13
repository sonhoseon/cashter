'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface BotSettings {
  symbol: string
  isActive: boolean
  buyPrice: string
  sellPrice: string
  status?: string
}

export default function BotSettingsPage() {
  const [settings, setSettings] = useState<BotSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const incomingSymbol = searchParams?.get('symbol') || '' // ✅ null safe 처리

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'bot'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as BotSettings

        // ✅ URL로 전달된 symbol 우선 적용
        const finalSettings = {
          ...data,
          symbol: incomingSymbol || data.symbol,
        }

        setSettings(finalSettings)
        setLoading(false)
      } else {
        setSettings(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [incomingSymbol])

  if (loading) return <p className="text-white p-6">로딩 중...</p>
  if (!settings) return <p className="text-white p-6">봇 설정 데이터를 찾을 수 없습니다.</p>

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🤖 자동매매 봇 설정</h1>
      <ul className="text-sm space-y-2">
        <li><strong>심볼:</strong> {settings.symbol}</li>
        <li><strong>봇 활성화:</strong> {settings.isActive ? '✅ 활성화됨' : '⛔ 비활성화'}</li>
        <li><strong>매수 기준가:</strong> {settings.buyPrice}</li>
        <li><strong>매도 기준가:</strong> {settings.sellPrice}</li>
        <li><strong>상태:</strong> {settings.status || '대기 중'}</li>
      </ul>
    </div>
  )
}
