'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Reward {
  symbol: string
  amount: number
  timestamp: string
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([])

  useEffect(() => {
    const fetchRewards = async () => {
      const q = query(collection(db, 'rewards'), orderBy('timestamp', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => doc.data() as Reward)
      setRewards(data)
    }

    fetchRewards()
  }, [])

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">🎁 리워드 적립 이력</h1>

      {rewards.length === 0 ? (
        <p className="text-gray-400">아직 적립된 리워드가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {rewards.map((reward, idx) => (
            <li key={idx} className="bg-gray-900 p-4 rounded-lg border border-blue-500">
              <div className="text-sm text-blue-400">🪙 {reward.symbol}</div>
              <div className="text-lg font-semibold text-green-400">+{reward.amount.toFixed(2)} USDT</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(reward.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
