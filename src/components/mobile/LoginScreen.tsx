import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLogin();
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col items-center justify-between p-8">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* 3D Robot/Spark Character */}
        <div className="relative">
          <div className="size-48 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[48px] flex items-center justify-center rotate-6 animate-pulse">
            <Sparkles className="size-24 text-white" strokeWidth={1.5} />
          </div>
          {/* Floating sparkles */}
          <div className="absolute -top-4 -right-4 size-12 bg-[#FFF4E6] rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="size-6 text-[#F47920]" />
          </div>
          <div className="absolute -bottom-2 -left-2 size-8 bg-[#FFF4E6] rounded-full flex items-center justify-center animate-bounce delay-150">
            <Sparkles className="size-4 text-[#F47920]" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-[#191F28]">
            AI와 함께
            <br />
            더 쉬운 업무
          </h1>
          <p className="text-[#8B95A1]">
            SC AI-Pass로 업무를 더 쉽게
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full space-y-4">
        <Button
          onClick={handleGoogleLogin}
          className="w-full h-14 bg-[#F47920] hover:bg-[#E06810] text-white rounded-[16px]"
        >
          Google로 시작하기
        </Button>
        <p className="text-center text-[12px] text-[#8B95A1]">
          계속 진행하면 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}
