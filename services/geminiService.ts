import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { products } from '../data/products';

// Helper to format product list for the AI context
const productContext = products.map(p => 
  `- ${p.name} (${p.category}): ${p.description}. الفوائد: ${p.benefits.join(', ')}`
).join('\n');

const SYSTEM_INSTRUCTION = `
أنت مساعد ذكي ومستشار صحي لشركة "SaniVita Pharma".
دورك هو مساعدة العملاء في اختيار المكملات الغذائية المناسبة لهم من قائمة منتجاتنا، والإجابة عن الأسئلة الصحية العامة.

قائمة منتجاتنا هي:
${productContext}

قواعد الإجابة:
1. كن ودوداً، مهنياً، ومحترماً.
2. تحدث دائماً باللغة العربية.
3. قم بترشيح منتجات "SaniVita Pharma" فقط بناءً على شكوى المستخدم أو احتياجه.
4. اشرح لماذا ترشح هذا المنتج (فوائده).
5. **تحذير هام:** يجب عليك دائماً إنهاء نصيحتك بجملة تنص على أنك ذكاء اصطناعي وأن نصيحتك لا تغني عن استشارة الطبيب المختص، خاصة في حالات الحمل أو الأمراض المزمنة.
6. اجعل إجاباتك موجزة ومفيدة.
`;

let chatInstance: Chat | null = null;

export const getChatInstance = (): Chat => {
  if (chatInstance) return chatInstance;

  const apiKey = process.env.API_KEY || '';
  // Fallback for demo purposes if no key provided, though strictly we rely on env
  if (!apiKey) {
      console.warn("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatInstance = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatInstance;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
    const chat = getChatInstance();
    
    // Using sendMessageStream for better UX
    const result = await chat.sendMessageStream({ message });
    
    // Create a generator to yield text chunks
    async function* streamGenerator() {
        for await (const chunk of result) {
             const c = chunk as GenerateContentResponse;
             if (c.text) {
                 yield c.text;
             }
        }
    }
    
    return streamGenerator();
};