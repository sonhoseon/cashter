// src/pages/api/markets/all.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Market = {
  symbol: string
  price: number
}

type ResponseData = {
  markets: {
    symbol: string
    bybitPrice: number
    binancePrice: number
    spread: number | null
  }[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const bybitRes = await axios.get<{ result: { list: Market[] } }>(
      'https://api.bybit.com/v5/market/tickers?category=linear'
    )
    const binanceRes = await axios.get<Market[]>(
      'https://api.binance.com/api/v3/ticker/price'
    )

    const bybit = bybitRes.data.result.list
    const binance = binanceRes.data

    const results = bybit.map((item) => {
      const symbol1 = item.symbol.replace('USDT', '')
      const bybitPrice = Number(item.price)
      const binanceMatch = binance.find((b) => b.symbol === `${symbol1}USDT`)
      const binancePrice = binanceMatch ? Number(binanceMatch.price) : 0

      return {
        symbol: symbol1,
        bybitPrice,
        binancePrice,
        spread: binancePrice ? Math.abs(bybitPrice - binancePrice) : null,
      }
    })

    res.status(200).json({ markets: results })
  } catch (err) {
    console.error(err)
    res.status(500).json({ markets: [] })
  }
}
