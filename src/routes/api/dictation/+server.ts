import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
}
const genAI = new GoogleGenerativeAI(apiKey);

export const POST: RequestHandler = async ({ url, request }) => {
    const blob = await request.blob();

    if (blob instanceof Blob) {
        const arrayBuffer = await blob.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString('base64');

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: blob.type || 'audio/ogg',
                    data: base64Audio,
                },
            },
            { text: 'Transcribe the audio to text. Only output the transcribed text with no additional commentary.' },
        ]);

        return new Response(result.response.text());
    }

    // Create a custom error response
    const errorResponse = new Response('Invalid audio data', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' },
    });

    return errorResponse;
}
