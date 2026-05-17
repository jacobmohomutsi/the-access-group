import { client } from "@/lib/graphql";
import { HOME_QUERY } from "@/queries/homeQuery";
import Image from "next/image";

export default async function Home() {
  const data = await client.request(HOME_QUERY);

  const page = data.page;

  return (
    <main>
      <h1>{page.title}</h1>

      {page.featuredImage && (
        <Image
          src={page.featuredImage.node.sourceUrl}
          alt={page.featuredImage.node.altText}
          width={400}
          height={400}
        />
      )}

      <div
        dangerouslySetInnerHTML={{
          __html: page.content,
        }}
      />
    </main>
  );
}