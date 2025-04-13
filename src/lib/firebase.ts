// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 🔑 Firebase 콘솔에서 설정 복사해서 아래에 붙여넣기
const firebaseConfig = {
  apiKey: "본인의-API-KEY",
  authDomain: "본인의-authDomain",
  projectId: "본인의-projectId",
  storageBucket: "본인의-storageBucket",
  messagingSenderId: "본인의-senderId",
  appId: "본인의-appId",
  measurementId: "본인의-measurementId"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
