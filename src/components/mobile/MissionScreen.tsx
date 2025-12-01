import { CheckCircle, Heart, Sparkles, ChevronRight, Gift } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  completed: boolean;
  color: string;
}

export default function MissionScreen() {
  const missions: Mission[] = [
    {
      id: '1',
      title: 'AI에게 인사하기',
      description: '처음 채팅을 시작하세요',
      points: 10,
      icon: <CheckCircle className="size-8" />,
      completed: true,
      color: 'from-[#4ADE80] to-[#22C55E]',
    },
    {
      id: '2',
      title: '데일리 체크인',
      description: '오늘 앱을 방문하세요',
      points: 5,
      icon: <Heart className="size-8" />,
      completed: false,
      color: 'from-[#F472B6] to-[#EC4899]',
    },
    {
      id: '3',
      title: 'AI 어시스턴트 사용하기',
      description: '작업에서 도움을 받아보세요',
      points: 15,
      icon: <Sparkles className="size-8" />,
      completed: false,
      color: 'from-[#F47920] to-[#FF9D5C]',
    },
  ];

  return (
    <div className="min-h-screen px-5 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-[#191F28]">데일리 퀴스트</h1>
        <p className="text-[#8B95A1]">미션을 완료하고 포인트를 획득하세요</p>
      </div>

      {/* Reward Banner */}
      <div className="bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[24px] p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="size-6" />
              <h3>오늘의 보너스</h3>
            </div>
            <p className="text-white/90">모든 미션을 완료하면 +50 포인트를 얻을 수 있습니다!</p>
          </div>
          <div className="size-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-[28px]">🎁</span>
          </div>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-3">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm">
        <h3 className="text-[#191F28] mb-4">나의 진행 상황</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-[#191F28] mb-1">850</p>
            <p className="text-[#8B95A1]">총 포인트</p>
          </div>
          <div className="text-center">
            <p className="text-[#191F28] mb-1">12</p>
            <p className="text-[#8B95A1]">완료</p>
          </div>
          <div className="text-center">
            <p className="text-[#F47920] mb-1">3</p>
            <p className="text-[#8B95A1]">연속 일수</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-sm flex items-center gap-4">
      {/* Icon */}
      <div
        className={`size-16 bg-gradient-to-br ${mission.color} rounded-[20px] flex items-center justify-center flex-shrink-0 text-white ${mission.completed ? 'opacity-50' : ''
          }`}
      >
        {mission.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className={`text-[#191F28] mb-1 ${mission.completed ? 'line-through' : ''}`}>
          {mission.title}
        </h4>
        <p className="text-[#8B95A1] mb-2">{mission.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-[#F47920]">+{mission.points} 포인트</span>
          {mission.completed && (
            <span className="text-[#4ADE80]">✓ 완료</span>
          )}
        </div>
      </div>

      {/* Action */}
      {!mission.completed && (
        <button className="size-10 bg-[#F2F4F6] rounded-full flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
          <ChevronRight className="size-5 text-[#8B95A1]" />
        </button>
      )}
    </div>
  );
}
