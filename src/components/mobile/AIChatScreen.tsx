import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { db, auth } from '../../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { updateSessionTitle, updateSessionFirstMessage, generateTitleFromMessage } from '../../lib/chatSessions';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  sessionId?: string;
}

interface AIChatScreenProps {
  sessionId: string;
  onMenuClick: () => void;
}

export default function AIChatScreen({ sessionId, onMenuClick }: AIChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  useEffect(() => {
    // 안전장치: db가 초기화되지 않았으면 중단
    if (!db || !sessionId) {
      if (!sessionId) {
        setError("세션 ID가 없습니다");
      } else {
        setError("Firebase DB 연결 실패");
      }
      setLoading(false);
      return;
    }

    // Filter messages by sessionId
    const q = query(
      collection(db, 'messages'),
      where('sessionId', '==', sessionId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        setMessages(msgs);
        setLoading(false);
        setIsFirstMessage(msgs.length === 0);
      },
      (err) => {
        console.error("🔴 Firestore 읽기 에러:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating || !sessionId) return;
    const textToSend = input;
    setInput('');
    setIsGenerating(true);

    try {
      // Save user message with sessionId
      await addDoc(collection(db, 'messages'), {
        text: textToSend,
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid || 'anonymous',
        type: 'user',
        sessionId: sessionId,
      });

      // Update session title if this is the first message
      if (isFirstMessage) {
        const title = generateTitleFromMessage(textToSend);
        await updateSessionTitle(sessionId, title);
        await updateSessionFirstMessage(sessionId, textToSend);
        setIsFirstMessage(false);
      }

      // Generate and save AI response
      const { generateAIResponse } = await import('../../lib/llm');
      const aiResponse = await generateAIResponse(textToSend);

      await addDoc(collection(db, 'messages'), {
        text: aiResponse,
        createdAt: serverTimestamp(),
        userId: 'ai',
        type: 'ai',
        sessionId: sessionId,
      });
    } catch (err: any) {
      console.error("🔴 메시지 전송 실패:", err);
      alert("전송 실패: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  console.log("🔵 AIChatScreen state:", { loading, error, messagesCount: messages.length });

  if (loading) {
    console.log("🔵 Showing loading state");
    return <div className="h-full flex items-center justify-center text-[#8B95A1]">로딩 중...</div>;
  }

  // 에러 발생 시, 하얀 화면 대신 에러 메시지를 보여줌 (앱 다운 방지)
  if (error) {
    console.log("🔴 Showing error state:", error);
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-500 font-bold mb-2">⚠️ 연결 오류</p>
        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">{error}</p>
      </div>
    );
  }

  console.log("🔵 Showing chat UI");

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F2F4F6' }}>
      <div className="shrink-0 px-6 py-4 flex items-center justify-between shadow-sm z-10" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="size-5" style={{ color: '#191F28' }} />
          </button>
          <h2 className="font-bold text-lg" style={{ color: '#191F28' }}>SC AI-Pass</h2>
        </div>
        <div className="size-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #F47920, #FF9D5C)' }}>
          <span className="text-xs font-bold" style={{ color: 'white' }}>L1</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center" style={{ color: '#8B95A1' }}>
            <MessageSquare className="size-12 mb-2 opacity-20" />
            <p>대화를 시작해보세요!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-[16px] text-sm shadow-sm"
                  style={{
                    backgroundColor: msg.type === 'user' ? '#F47920' : 'white',
                    color: msg.type === 'user' ? 'white' : '#191F28',
                    borderTopRightRadius: msg.type === 'user' ? '2px' : '16px',
                    borderTopLeftRadius: msg.type === 'ai' ? '2px' : '16px'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div
                  className="max-w-[80%] px-4 py-3 rounded-[16px] text-sm shadow-sm"
                  style={{
                    backgroundColor: 'white',
                    color: '#8B95A1',
                    borderTopLeftRadius: '2px'
                  }}
                >
                  <div className="flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="shrink-0 px-4 py-3 border-t flex gap-2 safe-area-bottom" style={{ backgroundColor: 'white', borderColor: '#F2F4F6' }}>
        <div className="flex-1 rounded-full px-4 flex items-center" style={{ backgroundColor: '#F2F4F6' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleSend()}
            placeholder={isGenerating ? "AI가 응답 중..." : "메시지를 입력하세요..."}
            disabled={isGenerating}
            className="flex-1 border-none outline-none text-sm py-3"
            style={{ backgroundColor: 'transparent', color: '#191F28' }}
          />
        </div>
        <Button
          onClick={handleSend}
          size="icon"
          className="rounded-full shrink-0"
          style={{
            backgroundColor: isGenerating ? '#8B95A1' : '#F47920',
            cursor: isGenerating ? 'not-allowed' : 'pointer'
          }}
          disabled={isGenerating}
        >
          <Send className="size-4" style={{ color: 'white' }} />
        </Button>
      </div>
    </div>
  );
}
