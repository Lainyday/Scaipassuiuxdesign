import { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function L2ApplicationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tasksCompleted: '',
    hoursUsed: '',
  });

  const timeSaved = formData.tasksCompleted && formData.hoursUsed
    ? parseInt(formData.tasksCompleted) * 5 + parseInt(formData.hoursUsed) * 2
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'applications'), {
        userId: 'user-1', // Dummy user ID
        userName: formData.name,
        department: formData.department,
        tasksCompleted: parseInt(formData.tasksCompleted),
        hoursUsed: parseInt(formData.hoursUsed),
        timeSaved: timeSaved,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      alert('신청이 제출되었습니다! 2-3 영업일 내에 답변을 받으실 수 있습니다.');
      onClose();
    } catch (error) {
      console.error("Error submitting application: ", error);
      alert('신청 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F2F4F6] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
        <h2 className="text-[#191F28]">L2 신청하기</h2>
        <button onClick={onClose} className="size-10 flex items-center justify-center">
          <X className="size-6 text-[#8B95A1]" />
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Card */}
          <div className="bg-gradient-to-br from-[#F47920] to-[#FF9D5C] rounded-[24px] p-5 text-white">
            <h3 className="mb-2">Level 2 혜택</h3>
            <ul className="space-y-2 text-white/90">
              <li>• 고급 AI 모델</li>
              <li>• 우선 지원</li>
              <li>• 커스텀 프롬프트 라이브러리</li>
            </ul>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <FormField
              label="성명"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="이름을 입력하세요"
            />
            <FormField
              label="이메일"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="your.email@sk.com"
            />
            <FormField
              label="부서"
              value={formData.department}
              onChange={(value) => setFormData({ ...formData, department: value })}
              placeholder="예: 기술부, 마케팅부"
            />
            <FormField
              label="AI로 완료한 작업 수"
              type="number"
              value={formData.tasksCompleted}
              onChange={(value) => setFormData({ ...formData, tasksCompleted: value })}
              placeholder="작업 수"
            />
            <FormField
              label="이번 달 AI 사용 시간"
              type="number"
              value={formData.hoursUsed}
              onChange={(value) => setFormData({ ...formData, hoursUsed: value })}
              placeholder="시간"
            />
          </div>

          {/* Calculated Field */}
          {timeSaved > 0 && (
            <div className="bg-white rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-12 bg-[#F2F4F6] rounded-full flex items-center justify-center">
                  <Calculator className="size-6 text-[#F47920]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#8B95A1]">예상 절약 시간</p>
                  <p className="text-[#191F28]">{timeSaved}분</p>
                </div>
              </div>
              <p className="text-[#8B95A1]">
                사용 패턴을 분석한 결과, 상당한 시간을 절약하셨습니다!
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-[#F47920] hover:bg-[#E06810] text-white rounded-[16px]"
          >
            신청서 제출하기
          </Button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[#191F28]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#F9FAFB] rounded-[16px] px-4 py-4 text-[#191F28] placeholder:text-[#8B95A1] outline-none focus:ring-2 focus:ring-[#F47920]/20 transition-all"
        required
      />
    </div>
  );
}
