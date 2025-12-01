import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// 1. API 키 확인 로그 (중요!)
if (!apiKey) {
    console.error("🔴 Firebase API Key가 없습니다! .env.local 파일을 확인하세요.");
    console.log("현재 읽힌 키값:", import.meta.env);
} else {
    console.log("🟢 Firebase API Key 로드 성공:", apiKey.slice(0, 5) + "...");
}

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 2. 초기화 시도
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log("🟢 Firebase App 초기화 성공");
} catch (e) {
    console.error("🔴 Firebase 초기화 실패:", e);
    throw new Error("Firebase initialization failed. Please check your configuration.");
}

export const auth = getAuth(app);
export const db = getFirestore(app);
