import { Award, CheckCircle, Heart, Sparkles, TrendingUp, Clock } from 'lucide-react';

export default function RightPanel() {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* My Status Summary */}
      <div className="space-y-4">
        <h3 className="text-[#191F28]">My Status</h3>
        
        {/* Level Card */}
        <div className="bg-gradient-to-br from-[#CD7F32] to-[#A0522D] rounded-[24px] p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-[24px]">L1</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white mb-1">Bronze</h4>
              <p className="text-white/80">Top 10%</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-white/90">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-3/4" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Clock className="size-5" />}
            value="120"
            label="Mins Saved"
            color="from-[#F47920] to-[#FF9D5C]"
          />
          <StatCard
            icon={<Award className="size-5" />}
            value="850"
            label="Points"
            color="from-[#4ADE80] to-[#22C55E]"
          />
        </div>
      </div>

      {/* Today's Mission */}
      <div className="space-y-4">
        <h3 className="text-[#191F28]">Today's Mission</h3>
        
        <div className="space-y-3">
          <MissionCard
            icon={<CheckCircle className="size-5" />}
            title="Say Hello to AI"
            points={10}
            completed
            color="from-[#4ADE80] to-[#22C55E]"
          />
          <MissionCard
            icon={<Heart className="size-5" />}
            title="Daily Check-in"
            points={5}
            completed={false}
            color="from-[#F472B6] to-[#EC4899]"
          />
          <MissionCard
            icon={<Sparkles className="size-5" />}
            title="Use AI Assistant"
            points={15}
            completed={false}
            color="from-[#F47920] to-[#FF9D5C]"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-[#191F28]">Quick Actions</h3>
        <button className="w-full bg-[#FFF4E6] hover:bg-[#FFE8CC] text-[#F47920] rounded-[16px] px-4 py-3 transition-colors">
          Apply for L2
        </button>
        <button className="w-full bg-[#F2F4F6] hover:bg-[#E5E7EB] text-[#191F28] rounded-[16px] px-4 py-3 transition-colors">
          View Leaderboard
        </button>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#F2F4F6]">
      <div className={`size-10 bg-gradient-to-br ${color} rounded-[12px] flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <p className="text-[#191F28] mb-1">{value}</p>
      <p className="text-[#8B95A1]">{label}</p>
    </div>
  );
}

function MissionCard({
  icon,
  title,
  points,
  completed,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  points: number;
  completed: boolean;
  color: string;
}) {
  return (
    <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[#F2F4F6] flex items-center gap-3">
      <div
        className={`size-10 bg-gradient-to-br ${color} rounded-[12px] flex items-center justify-center text-white flex-shrink-0 ${
          completed ? 'opacity-50' : ''
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[#191F28] mb-1 truncate ${completed ? 'line-through' : ''}`}>
          {title}
        </p>
        <p className="text-[#8B95A1]">+{points} pts</p>
      </div>
      {completed && (
        <div className="text-[#4ADE80]">✓</div>
      )}
    </div>
  );
}
