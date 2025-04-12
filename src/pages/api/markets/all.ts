// src/pages/api/markets/all.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type MarketData = {
  symbol: string
  binancePrice?: number
  bybitPrice?: number
  spread?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [binanceRes, bybitRes] = await Promise.all([
      fetch('https://api.binance.com/api/v3/ticker/price'),
      fetch('https://api.bybit.com/v5/market/tickers?category=spot'),
    ])

    const binanceData = await binanceRes.json()
    const bybitData = await bybitRes.json()

    const binanceMap = new Map<string, number>()
    binanceData.forEach((item: any) => {
      binanceMap.set(item.symbol, parseFloat(item.price))
    })

    const markets: MarketData[] = []

    bybitData.result.list.forEach((item: any) => {
      const symbol = item.symbol.replace('USDT', '') + 'USDT'
      const bybitPrice = parseFloat(item.lastPrice)
      const binancePrice = binanceMap.get(symbol)
      const spread = binancePrice ? Math.abs(bybitPrice - binancePrice) : undefined

      markets.push({
        symbol,
        binancePrice,
        bybitPrice,
        spread,
      })
    })

    res.status(200).json({ markets })
  } catch (error) {
    console.error('Market fetch error:', error)
    res.status(500).json({ error: '시세 데이터를 불러오는 중 오류 발생' })
  }
}
