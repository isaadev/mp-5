import { NextResponse } from 'next/server';
import getCollection from "../../lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ alias: string }> }
) {
    const { alias } = await params;
    const links = await getCollection("links");
    
    const foundLink = await links.findOne({ alias });
    

    if (!foundLink) {
        return NextResponse.json(
        { error: 'That trimmed link does not exist' },
        { status: 404 }
        );
    }

    return NextResponse.redirect(foundLink.url);
}