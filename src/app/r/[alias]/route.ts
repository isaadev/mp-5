// src/app/r/[alias]/route.ts
import { redirect } from 'next/navigation';
import getCollection from "../../lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ alias: string }> }
) {
    const alias = await params;
    const links = await getCollection("links");

    const foundLink = await links.findOne({ alias });
    if (!foundLink) {
        console.log(`Alias not found in DB: ${alias}`);
        return new Response('That trimmed link does not exist', { status: 404 });
    }
    redirect(foundLink.url);
}