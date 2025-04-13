// src/app/partners/page.tsx
'use client';

export default function PartnersPage() {
  const exchanges = [
    { name: "바이낸스", en: "Binance", desc: "세계 최대 거래소, 다양한 코인과 높은 유동성" },
    { name: "코인베이스", en: "Coinbase", desc: "미국 최대, 규제 친화적 거래소" },
    { name: "크라켄", en: "Kraken", desc: "강력한 보안과 법정화폐 지원" },
    { name: "바이비트", en: "Bybit", desc: "파생상품 거래 특화 거래소" },
    { name: "후오비", en: "Huobi", desc: "아시아 기반 대형 거래소" },
    { name: "OKX", en: "OKX", desc: "파생상품, 고급 기능 탑재" },
    { name: "업비트", en: "Upbit", desc: "국내 대표 거래소, 원화 기반 거래" },
    { name: "빗썸", en: "Bithumb", desc: "다양한 암호화폐와 사용자 친화성" },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-500">
        제휴 거래소 안내
      </h1>
      <p className="text-center text-gray-400 mb-10">
        캐쉬터는 국내외 주요 거래소들과 함께<br className="hidden sm:inline" />
        리워드 및 자동매매 서비스를 제공합니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {exchanges.map((ex, idx) => (
          <div
            key={idx}
            className="bg-white text-black rounded-xl p-6 shadow hover:shadow-lg transition duration-200 text-center flex flex-col justify-center items-center min-h-[180px]"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-1">{ex.name}</h2>
            <p className="text-sm text-gray-600 mb-1">({ex.en})</p>
            <p className="text-sm text-gray-700">{ex.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-16">
        ※ 제휴 거래소는 지속적으로 추가될 예정입니다.
      </p>
    </main>
  );
}
