import {error} from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ url, request }) => {
    const audioUrl = await request.text()
    return new Response(String(audioUrl));
}