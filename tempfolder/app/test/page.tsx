// src/app/test/page.tsx
'use client';

import { useState } from 'react';

export default function TestPage() {
  const [amount, setAmount] = useState('');
  const feeRate = 0.001; // 수수료 0.1%
  const cashbackRate = 0.2; // 페이백 20%

  const parsedAmount = parseFloat(amount) || 0;
  const fee = parsedAmount * feeRate;
  const cashback = fee * cashbackRate;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500">
        💸 페이백 시뮬레이터
      </h1>

      <p className="text-gray-400 mb-10">
        거래소에서 테더로 결제했을 때, 얼마나 돌려받을 수 있을까요?
      </p>

      <div className="w-full max-w-md">
        <input
          type="number"
          placeholder="거래 금액 (USDT)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 text-black rounded-lg text-lg mb-4"
        />

        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-400 mb-2">예상 수수료 (0.1%)</p>
          <p className="text-lg text-yellow-400 font-semibold mb-4">
            {fee.toFixed(2)} USDT
          </p>
          <p className="text-sm text-gray-400 mb-2">리워드 페이백 (20%)</p>
          <p className="text-lg text-green-400 font-semibold">
            {cashback.toFixed(2)} USDT 예상 적립
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-16">
        ※ 정확한 수수료율 및 리워드 비율은 거래소마다 다를 수 있습니다.
      </p>
    </main>
  );
}
