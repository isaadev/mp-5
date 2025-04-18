import { NextResponse } from 'next/server';
import getCollection from "../../lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ alias: string }> }
) {
    try {
        const { alias } = await params;
        const links = await getCollection("links");
        const foundLink = await links.findOne({ alias });

        if (!foundLink) {
            return NextResponse.json(
                { error: 'Link not found' },
                { status: 404 }
            );
        }

        return NextResponse.redirect(foundLink.url, 307);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'server error' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}