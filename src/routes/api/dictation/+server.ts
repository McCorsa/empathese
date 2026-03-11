import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
});

export const POST: RequestHandler = async ({ url, request }) => {
    const blob = await request.blob();

    if (blob instanceof Blob) {
        const file = new File([blob], "audio.ogg", { type: blob.type });

        const response = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: file,
        });

        return new Response(String(response.text));
    }

    // Create a custom error response
    const errorResponse = new Response('Invalid audio data', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' },
    });

    return errorResponse;
}
