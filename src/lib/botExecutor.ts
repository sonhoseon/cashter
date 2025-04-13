// src/lib/botExecutor.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';

export async function runAutoTrade(userId: string) {
  // Firestore에서 봇 설정 불러오기
  const docRef = doc(db, 'settings', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log('설정 없음');
    return;
  }

  const data = docSnap.data();
  const { enabled, buyCondition, sellCondition } = data;

  if (!enabled) {
    console.log('봇 비활성화 상태');
    return;
  }

  const fakePrice = Math.random() * 10000 + 10000;
  const isBuy = fakePrice < buyCondition;
  const isSell = fakePrice > sellCondition;

  let tradeType = null;
  if (isBuy) tradeType = 'buy';
  else if (isSell) tradeType = 'sell';

  if (!tradeType) {
    console.log('조건 불충족으로 매매 미실행');
    return;
  }

  await addDoc(collection(db, 'trades'), {
    userId,
    type: tradeType,
    price: Number(fakePrice.toFixed(2)),
    timestamp: serverTimestamp(),
  });

  console.log(`✅ 자동매매 ${tradeType} 실행됨`);
}
