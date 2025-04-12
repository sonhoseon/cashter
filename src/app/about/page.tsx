// src/app/about/page.tsx
'use client';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6">
        캐쉬터는 어떤 서비스인가요?
      </h1>

      <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
        캐쉬터는 거래소 수수료를 리워드로 돌려주는 <span className="text-yellow-400 font-semibold">스마트 페이백 플랫폼</span>입니다.
        <br className="hidden sm:inline" />
        테더(USDT)를 사용할 때마다 자동으로 포인트가 적립되고, AI 자동매매 봇을 통해 수익도 함께 추구할 수 있어요.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
          <h2 className="text-xl font-semibold text-green-400 mb-2">💰 테더 리워드</h2>
          <p className="text-sm text-gray-300">
            제휴 거래소에서 결제할 때마다 리워드 포인트가 자동으로 적립돼요.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">🤖 AI 자동매매</h2>
          <p className="text-sm text-gray-300">
            설정한 조건에 따라 매수/매도를 자동 실행하는 초단타 봇 기능이 탑재돼 있어요.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow text-left">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">📊 통계 & 이력</h2>
          <p className="text-sm text-gray-300">
            나의 리워드 적립 이력과 자동매매 기록을 실시간으로 확인할 수 있어요.
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-16">
        ※ 캐쉬터는 꾸준한 업데이트와 새로운 거래소 제휴를 통해 기능이 계속 확장됩니다.
      </p>
    </main>
  );
}
