// src/app/r/[alias]/route.ts
import { redirect } from 'next/navigation';
import getCollection from "../../lib/db";

export async function GET(
    request: Request,
    { params }: { params: { alias: string } }
) {
    const alias = params.alias;
    const links = await getCollection("links");

    const foundLink = await links.findOne({ alias });
    if (!foundLink) {
        console.log(`Alias not found in DB: ${alias}`);
        return new Response('That shortened link does not exist', { status: 404 });
    }

    console.log(`Redirecting ${alias} to ${foundLink.url}`);
    redirect(foundLink.url);
}