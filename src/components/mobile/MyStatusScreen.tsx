import { Award, Lock, Zap, Trophy, TrendingUp, Clock } from 'lucide-react';

export default function MyStatusScreen({ onApplyL2 }: { onApplyL2: () => void }) {
  return (
    <div className="min-h-screen px-5 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[#191F28]">내 상태</h1>
      </div>

      {/* Top Status Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm">
        {/* Level Badge */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <div className="size-28 bg-gradient-to-br from-[#CD7F32] to-[#A0522D] rounded-[32px] flex items-center justify-center shadow-lg">
              <span className="text-white">L1</span>
            </div>
            {/* 3D Medal Effect */}
            <div className="absolute -top-2 -right-2 size-8 bg-[#FFD700] rounded-full flex items-center justify-center">
              <Award className="size-4 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-[#191F28] mb-1">브론즈 레벨</h3>
            <p className="text-[#8B95A1]">오늘 상위 10%입니다!</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#8B95A1]">다음 레벨까지</span>
            <span className="text-[#F47920]">75%</span>
          </div>
          <div className="h-3 bg-[#F2F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#F47920] to-[#FF9D5C] rounded-full w-3/4" />
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        <ActionCard
          icon={<Lock className="size-8 text-[#8B95A1]" />}
          title="L1 퀴즈 챌린지"
          description="퀴즈를 완료하고 포인트를 획득하세요"
          badge="이용 가능"
          available
        />
        <ActionCard
          icon={<Zap className="size-8 text-[#F47920]" />}
          title="L2 신청하기"
          description="고급 AI 기능 잠금 해제"
          badge="지금 신청"
          available
          onClick={onApplyL2}
        />
        <ActionCard
          icon={<Trophy className="size-8 text-[#D3D3D3]" />}
          title="L3 신청하기"
          description="마스터 레벨 - 곧 출시 예정"
          badge="잠김"
          available={false}
        />
      </div>

      {/* History Section */}
      <div className="space-y-3">
        <h3 className="text-[#191F28]">나의 성과</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <StatCard icon={<Clock />} value="120분" label="절약한 시간" />
          <StatCard icon={<TrendingUp />} value="45개" label="완료한 작업" />
          <StatCard icon={<Award />} value="850점" label="포인트" />
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  badge,
  available,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  available: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!available}
      className="w-full bg-white rounded-[24px] p-5 shadow-sm flex items-center gap-4 disabled:opacity-50"
    >
      <div className="size-16 bg-[#F2F4F6] rounded-[20px] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h4 className="text-[#191F28] mb-1">{title}</h4>
        <p className="text-[#8B95A1]">{description}</p>
      </div>
      <div
        className={`px-4 py-2 rounded-full ${available ? 'bg-[#FFF4E6] text-[#F47920]' : 'bg-[#F2F4F6] text-[#8B95A1]'
          }`}
      >
        <span>{badge}</span>
      </div>
    </button>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white rounded-[24px] p-5 min-w-[140px] flex-shrink-0 shadow-sm">
      <div className="size-10 bg-[#F2F4F6] rounded-[16px] flex items-center justify-center mb-3 text-[#F47920]">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[#191F28]">{value}</p>
        <p className="text-[#8B95A1]">{label}</p>
      </div>
    </div>
  );
}
