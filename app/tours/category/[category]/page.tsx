import { client } from "@/lib/sanity";
import { TOURS_BY_CATEGORY } from "@/lib/queries";

export default async function CategoryPage({ params }: any) {
  const { category } = params;

  const tours = await client.fetch(TOURS_BY_CATEGORY, {
    category,
  });

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 capitalize">
        {category} Tours
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {tours.map((tour: any) => (
          <div key={tour._id} className="bg-white shadow rounded">
            <img src={tour.image} />
            <div className="p-3">
              <h3>{tour.title}</h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}