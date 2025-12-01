import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('⚠️ Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env.local');
}

const genAI = apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE'
    ? new GoogleGenerativeAI(apiKey)
    : null;

/**
 * Generate AI response using Google Gemini API
 * @param userMessage - The user's message to respond to
 * @returns AI-generated response text
 */
export async function generateAIResponse(userMessage: string): Promise<string> {
    try {
        if (!genAI) {
            return '죄송합니다. AI 서비스가 설정되지 않았습니다. 관리자에게 문의해주세요.';
        }

        // Use Gemini 2.5 Flash - confirmed working model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `당신은 SC AI-Pass의 친절한 AI 어시스턴트입니다. 사용자의 질문에 한국어로 답변해주세요.

사용자 질문: ${userMessage}

답변:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text || '죄송합니다. 응답을 생성할 수 없습니다.';
    } catch (error: any) {
        console.error('🔴 Gemini API Error:', error);

        // Handle specific error cases
        if (error.message?.includes('API key') || error.message?.includes('401')) {
            return '죄송합니다. API 키 설정에 문제가 있습니다. 관리자에게 문의해주세요.';
        }

        if (error.message?.includes('quota') || error.message?.includes('429')) {
            return '죄송합니다. 일일 사용량을 초과했습니다. 나중에 다시 시도해주세요.';
        }

        return '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.';
    }
}
