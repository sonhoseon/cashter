// src/lib/fakeTicker.ts
type TickerCallback = (price: number) => void;

let currentPrice = 10000;

export function startFakeTicker(callback: TickerCallback) {
  setInterval(() => {
    const delta = (Math.random() - 0.5) * 200;
    currentPrice = Math.max(1000, currentPrice + delta);
    callback(parseFloat(currentPrice.toFixed(2)));
  }, 1000); // 1초마다 가격 업데이트
}
