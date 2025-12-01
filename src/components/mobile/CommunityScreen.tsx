import { Sparkles, Copy, Heart, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface Post {
  id: string;
  author: string;
  level: string;
  title: string;
  prompt: string;
  likes: number;
  comments: number;
}

export default function CommunityScreen() {
  const posts: Post[] = [
    {
      id: '1',
      author: 'John Kim',
      level: 'L2',
      title: '50페이지를 10초 만에 요약',
      prompt: '이 50페이지 보고서를 핵심 사항과 조치 항목으로 요약해주세요...',
      likes: 24,
      comments: 8,
    },
    {
      id: '2',
      author: 'Sarah Park',
      level: 'L3',
      title: '주간 보고서 자동 생성',
      prompt: '내 작업 목록과 캘린더 일정을 기반으로 주간 상태 보고서를 작성해주세요...',
      likes: 42,
      comments: 15,
    },
    {
      id: '3',
      author: 'Mike Lee',
      level: 'L2',
      title: '문서를 5개 국어로 번역',
      prompt: '이 기술 문서를 한국어, 일본어, 중국어로 번역해주세요...',
      likes: 18,
      comments: 5,
    },
  ];

  return (
    <div className="min-h-screen px-5 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-[#191F28]">커뮤니티</h1>
        <p className="text-[#8B95A1]">AI 프롬프트를 발견하고 공유하세요</p>
      </div>

      {/* Trending Banner */}
      <div className="bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[24px] p-5 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="size-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="size-6" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1">🔥 이번 주 트렌드</h3>
            <p className="text-white/90">이메일 자동화 프롬프트</p>
          </div>
        </div>
      </div>

      {/* Post Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-sm space-y-4">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="size-10 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-full flex items-center justify-center">
          <span className="text-white">{post.author[0]}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[#191F28]">{post.author}</span>
            <span className="px-2 py-0.5 bg-[#FFF4E6] text-[#F47920] rounded-full text-[11px]">
              {post.level}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-[#191F28]">{post.title}</h3>
        <div className="bg-[#F9FAFB] rounded-[16px] p-4">
          <p className="text-[#6B7280] line-clamp-2">{post.prompt}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button className="flex-1 bg-gradient-to-r from-[#F47920] to-[#FF9D5C] hover:opacity-90 text-white rounded-full h-11">
          <Copy className="size-4 mr-2" />
          이 프롬프트 사용하기
        </Button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-2 border-t border-[#F2F4F6]">
        <button className="flex items-center gap-2 text-[#8B95A1] hover:text-[#F47920] transition-colors">
          <Heart className="size-4" />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-[#8B95A1] hover:text-[#F47920] transition-colors">
          <MessageCircle className="size-4" />
          <span>{post.comments}</span>
        </button>
      </div>
    </div>
  );
}
