
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Product } from '../types';

let chatInstance: Chat | null = null;
let lastUsedProductsString: string = "";

const generateSystemInstruction = (products: Product[]) => {
  const productContext = products.map(p => 
    `- ${p.name} (${p.category}): ${p.description}. الفوائد: ${p.benefits.join(', ')}. السعر: ${p.price || 'غير محدد'}`
  ).join('\n');

  return `
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
}

export const getChatInstance = (products: Product[]): Chat => {
  const currentProductsString = JSON.stringify(products);
  
  if (!chatInstance || currentProductsString !== lastUsedProductsString) {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey) {
          console.warn("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      chatInstance = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: generateSystemInstruction(products),
          temperature: 0.7,
        },
      });
      lastUsedProductsString = currentProductsString;
  }

  return chatInstance;
};

export const sendMessageToGemini = async (message: string, products: Product[]): Promise<AsyncGenerator<string, void, unknown>> => {
    const chat = getChatInstance(products);
    
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
