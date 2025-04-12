// src/pages/api/insight/missing-on-binance.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type SymbolItem = { symbol: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bybitRes = await axios.get<{ result: { list: SymbolItem[] } }>(
      'https://api.bybit.com/v5/market/tickers?category=linear'
    )
    const binanceRes = await axios.get<SymbolItem[]>(
      'https://api.binance.com/api/v3/ticker/price'
    )

    const bybitSymbols = bybitRes.data.result.list.map((item) =>
      item.symbol.replace('USDT', '')
    )
    const binanceSymbols = new Set(
      binanceRes.data.map((item) => item.symbol.replace('USDT', ''))
    )

    const missing = bybitSymbols
      .filter((symbol) => !binanceSymbols.has(symbol))
      .map((symbol) => ({ symbol }))

    res.status(200).json({ missing })
  } catch (error) {
    console.error('[Missing Symbol API Error]', error)
    res.status(500).json({ error: '데이터 오류' })
  }
}
