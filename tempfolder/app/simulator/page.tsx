'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, deleteDoc, doc, query } from 'firebase/firestore'

export default function SimulatorPage() {
  const [buy, setBuy] = useState('')
  const [sell, setSell] = useState('')
  const [rewardRate, setRewardRate] = useState('')
  const [result, setResult] = useState('')
  const [deleteStatus, setDeleteStatus] = useState('')

  const simulate = () => {
    const buyNum = parseFloat(buy)
    const sellNum = parseFloat(sell)
    const reward = parseFloat(rewardRate)

    if (isNaN(buyNum) || isNaN(sellNum) || isNaN(reward)) {
      return setResult('숫자를 정확히 입력해주세요.')
    }

    const profit = sellNum - buyNum
    const rewardAmount = (sellNum * reward) / 100
    const total = profit + rewardAmount

    setResult(`수익: ${profit.toFixed(2)} / 리워드 예상: ${rewardAmount.toFixed(2)} / 총합: ${total.toFixed(2)} USDT`)
  }

  const deleteAllTrades = async () => {
    try {
      const q = query(collection(db, 'trades'))
      const snapshot = await getDocs(q)
      const batchDeletes = snapshot.docs.map((docItem) => deleteDoc(doc(db, 'trades', docItem.id)))
      await Promise.all(batchDeletes)
      setDeleteStatus('🗑️ 모든 트레이드 이력을 삭제했어요.')
    } catch (err) {
      console.error('삭제 실패:', err)
      setDeleteStatus('삭제 중 오류가 발생했어요.')
    }
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🤖 자동매매 전략 시뮬레이터</h1>

      <div className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 text-sm text-gray-300">매수 가격 (USDT)</label>
          <input
            value={buy}
            onChange={e => setBuy(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            placeholder="예: 10000"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">매도 가격 (USDT)</label>
          <input
            value={sell}
            onChange={e => setSell(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            placeholder="예: 12000"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">리워드 비율 (%)</label>
          <input
            value={rewardRate}
            onChange={e => setRewardRate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
            placeholder="예: 0.5"
          />
        </div>

        <button
          onClick={simulate}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          시뮬레이션 실행
        </button>

        {result && <p className="mt-4 text-green-400">{result}</p>}
      </div>

      <hr className="my-10 border-gray-700" />

      <div className="max-w-md">
        <h2 className="text-lg font-bold mb-2">🗑️ 트레이드 이력 삭제</h2>
        <button
          onClick={deleteAllTrades}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          전체 삭제
        </button>
        {deleteStatus && <p className="mt-4 text-yellow-400">{deleteStatus}</p>}
      </div>
    </div>
  )
}
