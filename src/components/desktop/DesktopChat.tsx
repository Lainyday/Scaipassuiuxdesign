import { useState } from 'react';
import { Send, Paperclip, Mic, MessageSquare, FileText, Mail } from 'lucide-react';
import { Button } from '../ui/button';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

export default function DesktopChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '알겠습니다. 도움을 드릴게요!',
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#F2F4F6] px-8 py-5">
        <h1 className="text-[#191F28]">AI Assistant</h1>
        <p className="text-[#8B95A1] mt-1">Ask me anything about your work</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-[#F2F4F6] px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="flex-1 bg-[#F9FAFB] rounded-[20px] px-6 py-4 flex items-center gap-3 min-h-[56px]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-[#191F28] placeholder:text-[#8B95A1]"
              />
              <Button
                size="icon"
                variant="ghost"
                className="size-10 rounded-full hover:bg-[#F2F4F6]"
              >
                <Paperclip className="size-5 text-[#8B95A1]" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-10 rounded-full hover:bg-[#F2F4F6]"
              >
                <Mic className="size-5 text-[#8B95A1]" />
              </Button>
            </div>
            <Button
              onClick={handleSend}
              className="size-14 rounded-full bg-[#F47920] hover:bg-[#E06810]"
            >
              <Send className="size-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-12 py-20">
      {/* 3D Icon */}
      <div className="relative">
        <div className="size-32 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[48px] flex items-center justify-center shadow-xl">
          <MessageSquare className="size-16 text-white" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-3 -right-3 size-12 bg-[#FFF4E6] rounded-full flex items-center justify-center animate-bounce">
          <div className="size-3 bg-[#F47920] rounded-full" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-[#191F28]">Ask me anything</h2>
        <p className="text-[#8B95A1]">
          AI가 업무를 도와드릴게요. 무엇이든 물어보세요.
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <SuggestionCard
          icon={<FileText className="size-6" />}
          title="Site Report"
          description="Generate a comprehensive site report"
        />
        <SuggestionCard
          icon={<Mail className="size-6" />}
          title="Email Fix"
          description="Improve your email writing"
        />
      </div>
    </div>
  );
}

function SuggestionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="bg-white rounded-[24px] p-6 text-left hover:shadow-md transition-shadow border border-[#F2F4F6]">
      <div className="size-12 bg-[#F2F4F6] rounded-[16px] flex items-center justify-center text-[#F47920] mb-4">
        {icon}
      </div>
      <h4 className="text-[#191F28] mb-2">{title}</h4>
      <p className="text-[#8B95A1]">{description}</p>
    </button>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-6 py-4 rounded-[24px] ${
          message.type === 'user'
            ? 'bg-[#F47920] text-white'
            : 'bg-white text-[#191F28] border border-[#F2F4F6]'
        }`}
      >
        <p className="leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
