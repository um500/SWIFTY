import Link from "next/link";
import { urlFor } from "@/lib/image";

export default function TourCard({ tour }: any) {
  return (
    <Link href={`/tours/${tour.slug.current}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
        
        <img
          src={urlFor(tour.image).width(400).url()}
          alt={tour.title}
          className="h-52 w-full object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold">{tour.title}</h3>
          <p className="text-green-600 font-bold mt-2">
            ₹{tour.price}
          </p>
        </div>

      </div>
    </Link>
  );
}