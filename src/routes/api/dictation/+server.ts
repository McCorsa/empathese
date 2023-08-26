import {error} from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {OpenAI} from "openai";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
});

export const POST: RequestHandler = async ({ url, request }) => {

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream('sample.mp3')
    });
    
    return new Response(String(response.text));
}