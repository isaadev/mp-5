import { NextResponse } from "next/server";
import getCollection from "../lib/db";
import dns from "dns/promises";

export async function POST(request: Request) {
    const { url, alias } = await request.json();

    if (!url || !alias) {
        return NextResponse.json({ error: "Missing url or alias" }, { status: 400 });
    }

    let newUrl;
    try {
        newUrl = new URL(url);
    } catch (e) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
    try {
        await dns.lookup(newUrl.hostname);
    } catch (e) {
        return NextResponse.json({ error: "Domain doesn't exist" }, { status: 400 });
    }


    const links = await getCollection("links");

    const dupe = await links.findOne({ alias });
    if (dupe) {
        return NextResponse.json({ error: "Dupe found" }, { status: 400 });
    }

    await links.insertOne({ url, alias });

    return NextResponse.json({ message: "Link created", alias }, { status: 201 });
}