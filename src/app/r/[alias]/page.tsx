import { redirect } from 'next/navigation';
import getCollection from "../../lib/db";

interface PageProps {
    params: {
        alias: string;
    };
}

export default async function Page({ params }: PageProps) {
    const links = await getCollection("links");

    const foundLink = await links.findOne({ alias: params.alias });
    if (!foundLink) {
        return <div>Link not found</div>;
    }
    redirect(foundLink.url);
}