import type { Actions, PageServerLoad } from './$types';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { redirect } from '@sveltejs/kit';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
});

export const load: PageServerLoad = ({request}) => {
    if (request.method != "POST") {
        throw redirect(302, "/");
    }
}

export const actions = {
    default: async ({ cookies, request }) => {
        // Getting the user's input
        const data = await request.formData();
        const yourMessage = data.get("yourMessage")?.toString();
        const theirMessage = data.get("theirMessage")?.toString();
        const relationship = data.get("relationship")?.toString().toLowerCase();
        const responseQuality = data.get("quality")?.toString().toLowerCase();

        let responseQualityString = `You are a helpful conversation companion who helps me understand my conversation with my ${relationship} and uncover what my ${relationship} really means when they says something to me.`;
        if (responseQuality == "brutal") {
            responseQualityString = `You are a helpful conversation companion who helps me understand my conversation with my ${relationship} BUT you give the opposite intrepertation in a brutally harsh manner to what they actually meant and give insulting response suggestions.`;
            // responseQualityString = `You a friend who gives me horrible conversation advice. You have no clue what you're talking about and give answers that completely miss the point.`;
        }

        // const responseFormat = `{
        //     translation: <your interpretation of their response as a string>,
        //     suggestions: [
        //         <first ${responseQuality} suggestion for a response that I could say to them as string>,
        //         <second ${responseQuality} suggestion for a response that I could say to them as string>,
        //         <third ${responseQuality} suggestion for a response that I could say to them as string>,
        //     ]
        // }`;
        const responseFormat = `<your interpretation of their response as a string>;<first ${responseQuality} suggestion for a response that I could say to them as string>;<second ${responseQuality} suggestion for a response that I could say to them as string>;<third ${responseQuality} suggestion for a response that I could say to them as string>`;

        // Setting up the scenario
        const systemMessage =
        `${responseQualityString}
        I will give you a scenario of what I said and what they said.
        Give a response including an interpretation of what they said from your point of view speaking to me, along with three suggestions for possible responses I could say to them from my point of view.
        Respond in the following format:

        ${responseFormat}
        
        Don't give explanation or extra boilerplate around your response. Only include the format above in your response.`;
        console.log(systemMessage);

        // API call
        const chatCompletion = await openai.chat.completions.create({
            // model: "gpt-3.5-turbo",
            model: "gpt-4",
            messages: [
                {"role": "system", "content": systemMessage},
                {"role": "user", "content": `I said: ${yourMessage}`},
                {"role": "user", "content": `They said: ${theirMessage}`},
                {"role": "user", "content": `Relationship: ${relationship}`},
            ],
        });
    
        // Parsing the response
        const response = chatCompletion.choices[0].message.content || "NA;NA;NA;NA";
        console.log(response);
        const stringArray = response.split(";");

        const translation = stringArray[0];
        const suggestions = stringArray.slice(1);
        
        return {
            yourMessage,
            theirMessage,
            relationship,
            responseQuality,
            translation,
            suggestions,
        };
    },
} satisfies Actions;