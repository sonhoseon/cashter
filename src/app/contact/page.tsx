'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 여기서 DB 저장 or 이메일 전송 가능
    console.log({ name, email, message });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-20 text-gray-800">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">문의하기</h1>
        <p className="text-lg mb-10">
          제휴 및 기타 문의사항이 있으시면 아래 양식을 작성해주세요.<br />
          빠르게 답변드리겠습니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">문의 내용</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            문의 보내기
          </button>
        </form>

        {submitted && (
          <p className="mt-6 text-green-600 font-medium">
            문의가 정상적으로 제출되었습니다. 감사합니다!
          </p>
        )}
      </div>
    </main>
  );
}
