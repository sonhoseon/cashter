// src/pages/api/insight/missing-on-binance.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bybitRes = await axios.get<any>('https://api.bybit.com/v5/market/tickers?category=spot')
    const binanceRes = await axios.get<any>('https://api.binance.com/api/v3/ticker/price')

    const bybitSymbols: string[] = bybitRes.data.result.list.map((item: any) =>
      item.symbol.replace('USDT', '')
    )

    const binanceSymbols = new Set(
      binanceRes.data.map((item: any) => item.symbol.replace('USDT', ''))
    )

    const missing = bybitSymbols
      .filter((symbol: string) => !binanceSymbols.has(symbol))
      .map((symbol: string) => ({ symbol }))

    res.status(200).json({ missing })
  } catch (error) {
    console.error('[Missing Symbol API Error]', error)
    res.status(500).json({ error: '데이터 오류' })
  }
}
