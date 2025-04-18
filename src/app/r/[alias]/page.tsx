import { redirect } from 'next/navigation';
import getCollection from "../../lib/db";

export default async function Page({ params }: { params: { alias: string } }) {
    const links = await getCollection("links");

    const foundLink = await links.findOne({ alias: params.alias });
    if (!foundLink) {
        return <div>Link not found</div>;
    }
    redirect(foundLink.url);
}