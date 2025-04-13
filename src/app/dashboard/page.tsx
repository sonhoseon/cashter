'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface Reward {
  symbol: string
  amount: number
  timestamp: string
}

interface Trade {
  type: string
  symbol: string
  price: number
  timestamp: string
}

export default function DashboardPage() {
  const [rewardData, setRewardData] = useState<{ date: string; amount: number }[]>([])
  const [tradeData, setTradeData] = useState<{ date: string; buy: number; sell: number }[]>([])

  // ✅ 리워드 통계 차트용 데이터 불러오기
  useEffect(() => {
    const fetchRewards = async () => {
      const q = query(collection(db, 'rewards'), orderBy('timestamp', 'asc'))
      const snapshot = await getDocs(q)
      const rawData = snapshot.docs.map(doc => doc.data() as Reward)

      const grouped: { [date: string]: number } = {}

      rawData.forEach(reward => {
        const date = new Date(reward.timestamp).toLocaleDateString()
        grouped[date] = (grouped[date] || 0) + reward.amount
      })

      const chartData = Object.entries(grouped).map(([date, amount]) => ({ date, amount }))
      setRewardData(chartData)
    }

    fetchRewards()
  }, [])

  // ✅ 자동매매 실행 이력 데이터 불러오기
  useEffect(() => {
    const fetchTrades = async () => {
      const snapshot = await getDocs(collection(db, 'trades'))
      const grouped: { [date: string]: { buy: number; sell: number } } = {}

      snapshot.docs.forEach(doc => {
        const trade = doc.data() as Trade
        const date = new Date(trade.timestamp).toLocaleDateString()

        if (!grouped[date]) grouped[date] = { buy: 0, sell: 0 }

        if (trade.type === 'buy') grouped[date].buy += 1
        if (trade.type === 'sell') grouped[date].sell += 1
      })

      const chartData = Object.entries(grouped).map(([date, value]) => ({
        date,
        ...value,
      }))

      setTradeData(chartData)
    }

    fetchTrades()
  }, [])

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-10">📊 대시보드</h1>

      {/* ✅ 리워드 차트 */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4">🎁 리워드 적립 통계</h2>
        {rewardData.length === 0 ? (
          <p className="text-gray-400">리워드 적립 이력이 없습니다.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rewardData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#00c8ff" name="적립 리워드" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </section>

      {/* ✅ 자동매매 이력 차트 */}
      <section>
        <h2 className="text-xl font-bold mb-4">🤖 자동매매 실행 이력</h2>
        {tradeData.length === 0 ? (
          <p className="text-gray-400">자동매매 이력이 없습니다.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="buy" stroke="#00e676" name="매수 건수" />
              <Line type="monotone" dataKey="sell" stroke="#ff5252" name="매도 건수" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </section>
    </div>
  )
}
