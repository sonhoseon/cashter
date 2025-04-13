'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Market {
  symbol: string;
  bybitPrice: number;
  binancePrice: number;
  spread: number | null;
}

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/markets/all');
        const data = res.data as { markets: Market[] };
        setMarkets(data.markets || []);
      } catch (err) {
        console.error('시세 가져오기 오류:', err);
      }
    };
    fetch();
  }, []);

  const filtered = markets
    .filter((item) => item.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.spread || 0) - (a.spread || 0));

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-xl font-bold mb-4">📊 실시간 거래소 시세 비교</h1>

      <input
        type="text"
        placeholder="코인 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 text-black rounded"
      />

      <ul className="space-y-2">
        {filtered.map((item) => (
          <li
            key={item.symbol}
            className={`flex justify-between items-center p-4 rounded-md ${
              item.spread && item.spread > 5 ? 'bg-red-900' : 'bg-gray-800'
            }`}
          >
            <div>
              <div className="font-bold">{item.symbol}</div>
              <div className="text-sm text-gray-300">
                Bybit: {item.bybitPrice} / Binance: {item.binancePrice}
              </div>
              <div className="text-sm">
                스프레드: {item.spread?.toFixed(2) ?? 'N/A'} USDT
              </div>
            </div>
            {item.spread && item.spread > 5 && (
              <button
                onClick={() => router.push(`/bot?symbol=${item.symbol}`)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                봇 설정
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
