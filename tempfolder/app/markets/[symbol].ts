// src/pages/api/markets/[symbol].ts
import type { NextApiRequest, NextApiResponse } from 'next'

// 거래소별 시세 가져오기
const fetchBinancePrice = async (symbol: string) => {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
    const data = await res.json()
    return { exchange: 'Binance', price: parseFloat(data.price) }
  } catch {
    return { exchange: 'Binance', price: null }
  }
}

const fetchBybitPrice = async (symbol: string) => {
  try {
    const res = await fetch(`https://api.bybit.com/v2/public/tickers?symbol=${symbol}`)
    const data = await res.json()
    const price = parseFloat(data.result[0].last_price)
    return { exchange: 'Bybit', price }
  } catch {
    return { exchange: 'Bybit', price: null }
  }
}

// API 핸들러
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Invalid symbol' })
  }

  const [binance, bybit] = await Promise.all([
    fetchBinancePrice(symbol),
    fetchBybitPrice(symbol),
  ])

  res.status(200).json({
    symbol,
    prices: [binance, bybit],
  })
}
