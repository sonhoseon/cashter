'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function SettingsPage() {
  const [symbol, setSymbol] = useState('')
  const [buyCondition, setBuyCondition] = useState('')
  const [sellCondition, setSellCondition] = useState('')
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      const snap = await getDoc(doc(db, 'settings', 'bot'))
      if (snap.exists()) {
        const data = snap.data()
        setSymbol(data.symbol || '')
        setBuyCondition(data.buyCondition || '')
        setSellCondition(data.sellCondition || '')
        setActive(data.active || false)
      }
    }
    loadSettings()
  }, [])

  const saveSettings = async () => {
    try {
      await setDoc(doc(db, 'settings', 'bot'), {
        symbol,
        buyCondition,
        sellCondition,
        active,
      })
      setStatus('✅ 설정이 저장되었습니다.')
    } catch (err) {
      console.error(err)
      setStatus('❌ 저장 실패')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ 자동매매 설정 변경</h1>

      <div className="space-y-4 max-w-md">
        <input
          className="w-full px-4 py-2 bg-zinc-800 rounded"
          placeholder="코인 심볼 (예: BTCUSDT)"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 bg-zinc-800 rounded"
          placeholder="매수 조건 (예: 가격이 < 30000)"
          value={buyCondition}
          onChange={e => setBuyCondition(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 bg-zinc-800 rounded"
          placeholder="매도 조건 (예: 가격이 > 35000)"
          value={sellCondition}
          onChange={e => setSellCondition(e.target.value)}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)}
          />
          봇 활성화
        </label>

        <button
          onClick={saveSettings}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          저장하기
        </button>

        {status && <p className="text-sm mt-2 text-green-400">{status}</p>}
      </div>
    </div>
  )
}
