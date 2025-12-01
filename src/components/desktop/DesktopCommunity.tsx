import { Copy, Heart, MessageCircle, Sparkles } from 'lucide-react';
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

export default function DesktopCommunity() {
  const posts: Post[] = [
    {
      id: '1',
      author: 'John Kim',
      level: 'L2',
      title: 'Summarized 50 pages in 10s',
      prompt: 'Please summarize this 50-page report into key points with action items...',
      likes: 24,
      comments: 8,
    },
    {
      id: '2',
      author: 'Sarah Park',
      level: 'L3',
      title: 'Generated weekly report automatically',
      prompt: 'Create a weekly status report based on my task list and calendar events...',
      likes: 42,
      comments: 15,
    },
    {
      id: '3',
      author: 'Mike Lee',
      level: 'L2',
      title: 'Translated documents to 5 languages',
      prompt: 'Translate this technical documentation to Korean, Japanese, Chinese...',
      likes: 18,
      comments: 5,
    },
    {
      id: '4',
      author: 'Emma Chen',
      level: 'L2',
      title: 'Created presentation slides from notes',
      prompt: 'Convert my meeting notes into a professional presentation with visual suggestions...',
      likes: 31,
      comments: 12,
    },
    {
      id: '5',
      author: 'David Jung',
      level: 'L1',
      title: 'Analyzed customer feedback',
      prompt: 'Analyze 100+ customer reviews and extract common themes and sentiment...',
      likes: 27,
      comments: 9,
    },
    {
      id: '6',
      author: 'Lisa Wang',
      level: 'L3',
      title: 'Automated email responses',
      prompt: 'Create professional email responses for common customer inquiries...',
      likes: 35,
      comments: 14,
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#F2F4F6] px-8 py-5">
        <h1 className="text-[#191F28]">Community</h1>
        <p className="text-[#8B95A1] mt-1">Discover and share AI prompts</p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Trending Banner */}
        <div className="bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[24px] p-6 text-white shadow-lg mb-8">
          <div className="flex items-center gap-4">
            <div className="size-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="size-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-2">🔥 Trending This Week</h2>
              <p className="text-white/90">Email automation and report generation prompts</p>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 border border-[#F2F4F6]">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="size-10 bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white">{post.author[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[#191F28] truncate">{post.author}</span>
            <span className="px-2 py-0.5 bg-[#FFF4E6] text-[#F47920] rounded-full text-[11px] flex-shrink-0">
              {post.level}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h4 className="text-[#191F28]">{post.title}</h4>
        <div className="bg-[#F9FAFB] rounded-[16px] p-4">
          <p className="text-[#6B7280] line-clamp-3">{post.prompt}</p>
        </div>
      </div>

      {/* Actions */}
      <Button className="w-full bg-gradient-to-r from-[#F47920] to-[#FF9D5C] hover:opacity-90 text-white rounded-full h-11">
        <Copy className="size-4 mr-2" />
        Try this Prompt
      </Button>

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
