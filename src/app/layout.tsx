// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: '캐쉬터(Cashter)',
  description: '테더 리워드 자동매매 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-black text-white">
        {/* 헤더 */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black text-white">
          <Link href="/">
            <h1 className="text-xl font-bold text-blue-500 hover:opacity-80">💰 캐쉬터</h1>
          </Link>
          <nav className="space-x-6 text-sm">
            <Link href="/about" className="hover:text-blue-400 transition">서비스 소개</Link>
            <Link href="/partners" className="hover:text-blue-400 transition">제휴 거래소</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">문의</Link>
          </nav>
        </header>

        {/* 본문 */}
        <main>{children}</main>

        {/* 푸터 */}
        <footer className="text-center text-gray-500 text-xs py-6 border-t border-gray-800">
          © 2025 캐쉬터 Inc. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
