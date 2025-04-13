'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Trade {
  type: string
  symbol: string
  price: number
  timestamp: string
}

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    const fetchTrades = async () => {
      const q = query(collection(db, 'trades'), orderBy('timestamp', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => doc.data() as Trade)
      setTrades(data)
    }

    fetchTrades()
  }, [])

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📜 자동매매 이력</h1>

      {trades.length === 0 ? (
        <p className="text-gray-400">거래 이력이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {trades.map((trade, idx) => (
            <li
              key={idx}
              className={`p-4 rounded-lg border ${
                trade.type === 'buy' ? 'border-green-500 bg-gray-900' : 'border-red-500 bg-gray-900'
              }`}
            >
              <div className="text-sm mb-1">
                {trade.type === 'buy' ? '📉 매수' : '📈 매도'} — <span className="text-blue-400">{trade.symbol}</span>
              </div>
              <div className="text-lg font-semibold">${trade.price.toFixed(2)}</div>
              <div className="text-xs text-gray-400 mt-1">{new Date(trade.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
