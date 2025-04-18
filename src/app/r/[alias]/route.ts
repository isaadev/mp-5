import { NextResponse } from 'next/server';
import getCollection from "../../lib/db";

export async function GET(
    request: Request,
    { params }: { params: { alias: string } }
): Promise<NextResponse> {  
    try {
        const { alias } = params;
        const links = await getCollection("links");
        const foundLink = await links.findOne({ alias });

        if (!foundLink) {
            return NextResponse.json(
                { error: 'Link not found' },
                { status: 404 }
            );
        }

        return NextResponse.redirect(foundLink.url);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}