import {error} from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {OpenAI} from "openai";
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID
});

export const POST: RequestHandler = async ({ url, request }) => {

    const blob = await request.blob();

    if (blob instanceof Blob) {
        const fileName = 'audio.ogg'; // Change this to the desired filename
        const filePath = path.join('./static/', fileName);
        try {
          const buffer = await blob.arrayBuffer();
          await fs.promises.writeFile(filePath, new Uint8Array(buffer));
          console.log('Blob saved as file:', filePath);
        } catch (error) {
          console.error('Error saving blob as file:', error);
          return {
            status: 500,
            body: 'Error saving blob as file',
          };
        }
    }

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream('./static/audio.ogg'),
    });
    
    return new Response(String(response.text));
}