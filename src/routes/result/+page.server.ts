import type { Actions } from './$types';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
  });

export const actions = {
    default: async ({cookies, request}) => {
        const systemMessage = `You are a helpful conversation companion who helps me understand my girlfriend and uncover what she really means when she says something to me. I will give you a scenario of what I said and what she said, and you will give a response including an interpretation of what she said along with three suggestions for possible responses I could say to her from my point of view to empathise with her, each with a title and the response that I would say to her, in the following json format:
        {
        translation: <your interpretation of her response as a string>,
        suggestions:
        [
        {
        title: <title of first response as string>
        response: <body of first response as string>
        },
        {
        title: <title of second response as string>
        response: <body of second response as string>
        },
        {
        title: <title of third response as string>
        response: <body of third response as string>
        }
        ]
        }
        
        Don't give explanation or extra boilerplate around your response. Only include the json format above in your response.`;
        const data = await request.formData();
        const yourMessage = data.get("yourMessage")?.toString();
        const theirMessage = data.get("theirMessage")?.toString();
        console.log(yourMessage, theirMessage);
    
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": systemMessage},
                {"role": "user", "content": `I said: ${yourMessage}`},
                {"role": "user", "content": `They said: ${theirMessage}`},
            ],
          });
    
        // const content = {
        //     role: 'assistant',
        //     content: '{\n' +
        //       `"translation": "She might be hurt or surprised by your comment, but doesn't want to express her anger directly. She might be feeling self-conscious about her body image.",\n` +
        //       '"suggestions": [\n' +
        //       '{\n' +
        //       '"title": "Apology and reassurance",\n' +
        //       `"response": "I'm really sorry for what I said, it was thoughtless and insensitive of me. I care about you and I know that your body is beautiful just the way it is."\n` +
        //       '},\n' +
        //       '{\n' +
        //       '"title": "Open up a conversation",\n' +
        //       `"response": "I understand that my comment caught you off guard. Is there something you'd like to talk about? I'm here to listen and understand how you're feeling."\n` +
        //       '},\n' +
        //       '{\n' +
        //       '"title": "Validate her feelings",\n' +
        //       '"response": "I can see that my comment hurt you and I apologize. Your feelings are valid, and I want to make sure we can communicate openly and honestly."\n' +
        //       '}\n' +
        //       ']\n' +
        //       '}'
        //     };
        // const chatCompletion = {
        //     id: 'chatcmpl-7reIDWnsgmHcNrewtG61x05HbCccR',
        //     object: 'chat.completion',
        //     created: 1693020625,
        //     model: 'gpt-3.5-turbo-0613',
        //     choices: [ { index: 0, message: content, finish_reason: 'stop' } ],
        //     usage: { prompt_tokens: 267, completion_tokens: 182, total_tokens: 449 }
        //   };
    
        const response = chatCompletion.choices[0].message;
        console.log(response.content)
        const parsed = JSON.parse(response.content || "{}");
        return {
            yourMessage,
            theirMessage,
            translation: parsed.translation,
            suggestions: parsed.suggestions,
        };
    },
} satisfies Actions;