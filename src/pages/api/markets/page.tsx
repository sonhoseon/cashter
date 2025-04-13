// src/app/markets/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface MarketData {
  symbol: string
  binance: number
  bybit: number
  spread: number
}

export default function MarketsPage() {
  const [data, setData] = useState<MarketData[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/markets/all')
      const json = await res.json()
      setData(json)
    }
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  const filtered = data
    .filter(item => item.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.spread - a.spread)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">거래소 시세 비교</h1>
      <input
        type="text"
        placeholder="코인 검색..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full px-4 py-2 rounded-md text-black"
      />
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="py-2">Symbol</th>
            <th className="py-2">Binance</th>
            <th className="py-2">Bybit</th>
            <th className="py-2">Spread</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr
              key={index}
              className={`border-b border-gray-800 ${item.spread > 1 ? 'bg-red-500/10' : ''}`}
            >
              <td className="py-2">{item.symbol}</td>
              <td className="py-2">{item.binance.toLocaleString()}</td>
              <td className="py-2">{item.bybit.toLocaleString()}</td>
              <td className="py-2 font-bold">{item.spread.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
