import { useState } from 'react';
import { Home, BarChart3, Target, Users, Sparkles, Menu } from 'lucide-react';
import DesktopChat from './desktop/DesktopChat';
import DesktopCommunity from './desktop/DesktopCommunity';
import RightPanel from './desktop/RightPanel';

export default function DesktopApp() {
  const [activeView, setActiveView] = useState<'chat' | 'community'>('chat');

  return (
    <div className="min-h-screen bg-[#F2F4F6] flex">
      {/* Left Sidebar */}
      <div className="w-[240px] bg-white flex flex-col shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-[#F2F4F6]">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[12px] flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <h2 className="text-[#191F28]">SC AI-Pass</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon={<Home className="size-5" />}
            label="Home"
            active={activeView === 'chat'}
            onClick={() => setActiveView('chat')}
          />
          <NavItem
            icon={<BarChart3 className="size-5" />}
            label="Status"
            active={false}
            onClick={() => { }}
          />
          <NavItem
            icon={<Target className="size-5" />}
            label="Mission"
            active={false}
            onClick={() => { }}
          />
          <NavItem
            icon={<Users className="size-5" />}
            label="Community"
            active={activeView === 'community'}
            onClick={() => setActiveView('community')}
          />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#F2F4F6]">
          <div className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-[#F2F4F6] cursor-pointer transition-colors">
            <div className="size-10 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-full flex items-center justify-center">
              <span className="text-white">L1</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#191F28] truncate">John Kim</p>
              <p className="text-[#8B95A1]">Bronze Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center Area */}
        <div className="flex-1 overflow-y-auto">
          {activeView === 'chat' && <DesktopChat />}
          {activeView === 'community' && <DesktopCommunity />}
        </div>

        {/* Right Panel */}
        <div className="w-[320px] bg-white shadow-sm overflow-y-auto">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] transition-colors ${active
          ? 'bg-[#FFF4E6] text-[#F47920]'
          : 'text-[#8B95A1] hover:bg-[#F2F4F6] hover:text-[#191F28]'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
