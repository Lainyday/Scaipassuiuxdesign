import { useState, useEffect } from 'react';
import LoginScreen from './mobile/LoginScreen';
import AIChatScreen from './mobile/AIChatScreen';
import MyStatusScreen from './mobile/MyStatusScreen';
import MissionScreen from './mobile/MissionScreen';
import CommunityScreen from './mobile/CommunityScreen';
import L2ApplicationForm from './mobile/L2ApplicationForm';
import ChatSidebar from './mobile/ChatSidebar';
import { Home, BarChart3, Target, Users } from 'lucide-react';
import { createNewSession } from '../lib/chatSessions';

export default function MobileApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'status' | 'mission' | 'community'>('chat');
  const [showL2Form, setShowL2Form] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-create new session on login
  useEffect(() => {
    if (isLoggedIn && !currentSessionId) {
      createNewSession().then(sessionId => {
        setCurrentSessionId(sessionId);
      }).catch(err => {
        console.error('Failed to create session:', err);
      });
    }
  }, [isLoggedIn, currentSessionId]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNewChat = async () => {
    try {
      const newSessionId = await createNewSession();
      setCurrentSessionId(newSessionId);
      setActiveTab('chat');
    } catch (err) {
      console.error('Failed to create new session:', err);
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setActiveTab('chat');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (showL2Form) {
    return <L2ApplicationForm onClose={() => setShowL2Form(false)} />;
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2F4F6'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        height: '100%',
        maxHeight: '100vh',
        position: 'relative',
        backgroundColor: '#F2F4F6',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Chat Sidebar - inside mobile container */}
        <ChatSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentSessionId={currentSessionId}
          onSessionSelect={handleSessionSelect}
          onNewChat={handleNewChat}
        />

        {/* Main Content - gets pushed right when sidebar opens */}
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          transform: isSidebarOpen ? 'translateX(70%)' : 'translateX(0)',
          transition: 'transform 300ms ease-out'
        }}>
          {/* Overlay for main content when sidebar is open */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black z-30"
              onClick={() => setIsSidebarOpen(false)}
              style={{
                opacity: 0.8
              }}
            />
          )}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: '80px',
            overflow: activeTab === 'chat' ? 'hidden' : 'auto'
          }}>
            {activeTab === 'chat' && currentSessionId && (
              <AIChatScreen
                sessionId={currentSessionId}
                onMenuClick={() => setIsSidebarOpen(true)}
              />
            )}
            {activeTab === 'status' && <MyStatusScreen onApplyL2={() => setShowL2Form(true)} />}
            {activeTab === 'mission' && <MissionScreen />}
            {activeTab === 'community' && <CommunityScreen />}
          </div>
        </div>

        {/* Bottom Navigation - also gets pushed right */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
          zIndex: 50,
          transform: isSidebarOpen ? 'translateX(70%)' : 'translateX(0)',
          transition: 'transform 300ms ease-out'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <TabButton icon={<Home style={{ width: '1.25rem', height: '1.25rem' }} />} label="홈" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
            <TabButton icon={<BarChart3 style={{ width: '1.25rem', height: '1.25rem' }} />} label="상태" active={activeTab === 'status'} onClick={() => setActiveTab('status')} />
            <TabButton icon={<Target style={{ width: '1.25rem', height: '1.25rem' }} />} label="미션" active={activeTab === 'mission'} onClick={() => setActiveTab('mission')} />
            <TabButton icon={<Users style={{ width: '1.25rem', height: '1.25rem' }} />} label="커뮤니티" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer'
      }}
    >
      <div style={{ color: active ? '#191F28' : '#8B95A1' }}>
        {icon}
      </div>
      <span style={{
        fontSize: '10px',
        color: active ? '#191F28' : '#8B95A1'
      }}>
        {label}
      </span>
    </button>
  );
}
