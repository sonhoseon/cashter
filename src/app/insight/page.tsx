'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface Coin {
  symbol: string
}

export default function InsightPage() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get<{ missing: Coin[] }>('/api/insight/missing-on-binance')
        setCoins(res.data.missing || [])
      } catch (error) {
        console.error('🔥 fetch error:', error)
      }
    }

    fetchAll()
  }, [])

  const filteredCoins = coins
    .filter((coin) => coin.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.symbol.localeCompare(b.symbol))

  const handleClick = (symbol: string) => {
    router.push(`/bot?symbol=${symbol}`)
  }

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
        🧠 바이낸스 미상장 코인 탐지
      </h1>

      <input
        type="text"
        placeholder="코인 심볼 검색"
        className="px-4 py-2 rounded bg-zinc-800 border border-zinc-600 mb-4 w-full max-w-sm text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCoins.length === 0 ? (
        <p className="text-gray-400">검색된 코인이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {filteredCoins.map((coin) => (
            <li
              key={coin.symbol}
              onClick={() => handleClick(coin.symbol)}
              className="bg-zinc-800 hover:bg-blue-600 transition rounded p-4 text-sm text-center cursor-pointer"
            >
              {coin.symbol}
              <p className="text-xs text-gray-400 mt-1">추천 대상</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
