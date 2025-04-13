// src/app/insight/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface Coin {
  symbol: string
}

export default function InsightPage() {
  const [data, setData] = useState<Coin[]>([])
  const [filtered, setFiltered] = useState<Coin[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMissing = async () => {
      try {
        const res = await fetch('/api/insight/missing-on-binance')
        const result = await res.json()
        setData(result.missing)
        setFiltered(result.missing)
      } catch (err) {
        console.error('Failed to fetch missing coins:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMissing()
  }, [])

  useEffect(() => {
    const filteredData = data.filter((coin) =>
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(filteredData)
  }, [search, data])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">🧠 AI 미상장 코인 탐지 결과</h1>

      <input
        type="text"
        placeholder="심볼 검색 (예: BTC)"
        className="w-full mb-6 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-400">로딩 중...</p>
      ) : (
        <ul className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-red-500">결과가 없습니다.</p>
          ) : (
            filtered.map((coin) => (
              <li
                key={coin.symbol}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700"
              >
                <span className="font-mono text-green-400">{coin.symbol}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
