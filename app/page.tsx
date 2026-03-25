import { client } from "@/lib/sanity";
import { MENU_QUERY } from "@/lib/queries";

export default async function Home() {
  const data = await client.fetch(MENU_QUERY);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Travel Website 🌍</h1>

      
    </div>
  );
}