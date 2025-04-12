'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  doc, getDoc, setDoc, updateDoc, addDoc, collection, serverTimestamp
} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import AnimatedNumber from '@/components/AnimatedNumber';
import { PiRobotDuotone } from 'react-icons/pi';
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [reward, setReward] = useState(0);
  const [price, setPrice] = useState<number>(10000);
  const [settings, setSettings] = useState<any>(null);
  const [lastBuyPrice, setLastBuyPrice] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) await setDoc(userRef, { reward: 0 });
        else setReward(userSnap.data().reward || 0);

        const settingRef = doc(db, 'settings', currentUser.uid);
        const settingSnap = await getDoc(settingRef);
        if (settingSnap.exists()) setSettings(settingSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const simulated = 9500 + Math.random() * 1000;
      setPrice(parseFloat(simulated.toFixed(2)));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user || !settings || !settings.isBotOn) return;

    const buyCond = parseFloat(settings.buyCondition);
    const sellCond = parseFloat(settings.sellCondition);

    const shouldBuy = lastBuyPrice === null && price <= buyCond;
    const shouldSell = lastBuyPrice !== null && price >= sellCond;

    const executeTrade = async (type: 'buy' | 'sell') => {
      await addDoc(collection(db, 'trades'), {
        userId: user.uid,
        type,
        price,
        timestamp: serverTimestamp()
      });
    };

    if (shouldBuy) {
      executeTrade('buy');
      setLastBuyPrice(price);
    }

    if (shouldSell) {
      executeTrade('sell');
      setLastBuyPrice(null);
    }
  }, [price, user, settings, lastBuyPrice]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleReward = async () => {
    if (!user) return;
    const newReward = reward + 10;
    await updateDoc(doc(db, 'users', user.uid), { reward: newReward });
    await addDoc(collection(db, 'rewards'), {
      userId: user.uid,
      points: 10,
      timestamp: serverTimestamp(),
      description: '홈페이지에서 리워드 수동 적립',
    });
    setReward(newReward);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center relative">
      {!user && (
        <button
          onClick={handleLogin}
          className="absolute top-4 right-6 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-full"
        >
          로그인
        </button>
      )}

      <div className="max-w-xl mt-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
          거래소 수수료 <br />
          <span className="text-blue-500">돌려받고</span> 자동으로 굴리세요.
        </h1>

        <p className="text-sm text-gray-400 mb-4">
          테더 결제 시 <span className="text-yellow-400">리워드 적립</span> +{' '}
          <span className="text-orange-400">AI 자동매매</span>로 수익까지.
        </p>

        <div className="text-sm text-gray-300 mb-4">
          현재 시세: <span className="text-yellow-300">{price.toFixed(2)} USDT</span> <br />
          내 리워드: <span className="text-green-400 font-semibold"><AnimatedNumber value={reward} /></span> 포인트
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <button
            onClick={handleReward}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            리워드 적립하기
          </button>
          {user && (
            <button
              onClick={() => router.push('/rewards')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              리워드 이력 보기
            </button>
          )}
        </div>

        {/* ✅ 기능 페이지 이동 버튼 */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => router.push('/partners')} className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded">
            제휴 거래소 보기
          </button>
          <button onClick={() => router.push('/insight')} className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded">
            미상장 코인 탐지
          </button>
          <button onClick={() => router.push('/bot')} className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded">
            자동매매 설정
          </button>
          <button onClick={() => router.push('/dashboard')} className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded">
            자동매매 대시보드
          </button>
          <button onClick={() => router.push('/simulator')} className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded">
            리워드/전략 시뮬레이터
          </button>
        </div>
      </div>

      <div className="mt-16">
        <p className="text-lg flex items-center justify-center gap-2">
          <PiRobotDuotone className="text-2xl text-white" />
          <span className="text-blue-400">
            <TypeAnimation
              sequence={['AI 자동매매봇으로', 2000, '매수/매도 자동 실행', 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          조건 만족 시 자동으로 매매가 실행됩니다.
        </p>
      </div>
    </main>
  );
}
