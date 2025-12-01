import { useEffect, useState } from 'react';
import { X, Plus, MessageSquare } from 'lucide-react';
import { ChatSession, subscribeToSessions } from '../../lib/chatSessions';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ChatSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentSessionId: string | null;
    onSessionSelect: (sessionId: string) => void;
    onNewChat: () => void;
}

export default function ChatSidebar({
    isOpen,
    onClose,
    currentSessionId,
    onSessionSelect,
    onNewChat
}: ChatSidebarProps) {
    const [sessions, setSessions] = useState<ChatSession[]>([]);

    useEffect(() => {
        const unsubscribe = subscribeToSessions(setSessions);
        return () => unsubscribe();
    }, []);

    const handleSessionClick = (sessionId: string) => {
        onSessionSelect(sessionId);
        onClose();
    };

    const handleNewChat = () => {
        onNewChat();
        onClose();
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return formatDistanceToNow(date, { addSuffix: true, locale: ko });
    };

    // Filter out empty sessions (no messages)
    const filteredSessions = sessions.filter(
        session => session.firstMessage && session.firstMessage.trim().length > 0
    );

    return (
        <>
            {/* Sidebar - 70% width, FULL height (top to bottom), slides from left */}
            <div
                className="absolute bg-white z-50 shadow-2xl flex flex-col"
                style={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '70%',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 300ms ease-out'
                }}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F2F4F6' }}>
                    <h2 className="font-bold text-lg" style={{ color: '#191F28' }}>채팅 기록</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="size-5" style={{ color: '#8B95A1' }} />
                    </button>
                </div>

                {/* New Chat Button */}
                <div className="px-4 py-3 flex-shrink-0">
                    <button
                        onClick={handleNewChat}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:shadow-md"
                        style={{
                            background: 'linear-gradient(to bottom right, #F47920, #FF9D5C)',
                            color: 'white'
                        }}
                    >
                        <Plus className="size-5" />
                        <span className="font-medium">새 채팅</span>
                    </button>
                </div>

                {/* Sessions List - filtered, takes remaining space */}
                <div className="flex-1 overflow-y-auto px-4 py-2" style={{ minHeight: 0 }}>
                    {filteredSessions.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center" style={{ color: '#8B95A1' }}>
                            <MessageSquare className="size-12 mb-2 opacity-20" />
                            <p className="text-sm">채팅 기록이 없습니다</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredSessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => handleSessionClick(session.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${currentSessionId === session.id
                                            ? 'bg-orange-50 border-2'
                                            : 'hover:bg-gray-50 border-2 border-transparent'
                                        }`}
                                    style={{
                                        borderColor: currentSessionId === session.id ? '#F47920' : 'transparent'
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <MessageSquare
                                            className="size-5 mt-0.5 shrink-0"
                                            style={{ color: currentSessionId === session.id ? '#F47920' : '#8B95A1' }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className="font-medium text-sm truncate"
                                                style={{ color: currentSessionId === session.id ? '#F47920' : '#191F28' }}
                                            >
                                                {session.title}
                                            </p>
                                            {session.firstMessage && (
                                                <p className="text-xs mt-1 truncate" style={{ color: '#8B95A1' }}>
                                                    {session.firstMessage}
                                                </p>
                                            )}
                                            <p className="text-xs mt-1" style={{ color: '#8B95A1' }}>
                                                {formatDate(session.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
