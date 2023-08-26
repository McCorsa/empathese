import type { Actions } from './$types';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
});

export const actions = {
    default: async ({ cookies, request }) => {
        // Getting the user's input
        const data = await request.formData();
        const yourMessage = data.get("yourMessage")?.toString();
        const theirMessage = data.get("theirMessage")?.toString();
        const relationship = data.get("relationship")?.toString();
        // const tone = data.get("tone")?.toString();
        const responseQuality = data.get("quality")?.toString();
        // const relationship = "girlfriend";
        const tone = "casual";
        // const responseQuality = "helpful";

        let responseQualityString = `You are a helpful conversation companion who helps me understand my conversation with my ${relationship} and uncover what my ${relationship} really means when they says something to me.`;
        if (responseQuality == "stupid") {
            responseQualityString = `You are a stupid conversation companion who gives me horrible, counterintuitive advice that completely misses the point.`;
        }

        const responseFormat = `"{
            translation: <your interpretation of their response as a string>,
            suggestions: [
                <body of first suggested response as string>,
                <body of second suggested response as string>,
                <body of third suggested response as string>,
            ]
        }"`;

        // The tone of the conversation is ${tone}, so cater your response to take into account the ${tone} tone.

        // Setting up the scenario
        const systemMessage =
        `${responseQualityString}
        I will give you a scenario of what I said and what my ${relationship} said.
        Give a response including an interpretation of what they said in 32 words maximum from your point of view speaking to me,
        along with three suggestions for possible responses I could say to them from my point of view.
        Respond in the following JSON object format:

        ${responseFormat}
        
        Don't give explanation or extra boilerplate around your response. Only include the JSON format above in your response.`;
        console.log(systemMessage);
        // API call
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": systemMessage},
                {"role": "user", "content": `I said to my ${relationship}: ${yourMessage}`},
                {"role": "user", "content": `My ${relationship} said back to me: ${theirMessage}`},
                {"role": "user", "content": `This person's relationship to me is: ${relationship}`},
                // {"role": "user", "content": `Tone of the conversation: ${tone}`},
            ],
        });
    
        const response = chatCompletion.choices[0].message.content || "{}";
        const parsed = JSON.parse(response);
        
        return {
            yourMessage,
            theirMessage,
            relationship,
            // tone,
            responseQuality,
            translation: parsed.translation,
            suggestions: parsed.suggestions,
        };
    },
} satisfies Actions;