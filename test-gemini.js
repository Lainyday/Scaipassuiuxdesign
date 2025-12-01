// Test script to list available Gemini models
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyCrx6NJnfMrDMVXXy3z50NEHpT8PqxJ7cw'; // Your API key from .env.local

async function listModels() {
    console.log('🔍 Fetching available Gemini models...\n');

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // Method 1: Try to list models
        console.log('Method 1: Listing models via SDK...');
        const models = await genAI.listModels();
        console.log('✅ Available models:');
        for await (const model of models) {
            console.log(`  - ${model.name}`);
            console.log(`    Display Name: ${model.displayName}`);
            console.log(`    Supported: ${model.supportedGenerationMethods?.join(', ')}`);
            console.log('');
        }
    } catch (error) {
        console.error('❌ Error listing models:', error.message);
    }

    // Method 2: Try common model names
    console.log('\n🧪 Testing common model names...\n');
    const modelNamesToTest = [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-2.0-flash',
        'gemini-2.5-flash',
        'gemini-flash',
        'models/gemini-pro',
        'models/gemini-1.5-flash',
    ];

    for (const modelName of modelNamesToTest) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello');
            const response = await result.response;
            console.log(`✅ ${modelName}: WORKS!`);
        } catch (error) {
            console.log(`❌ ${modelName}: ${error.message.split('\n')[0]}`);
        }
    }
}

listModels().catch(console.error);
