export default function Hero() {
  return (
    <div className="h-[60vh] bg-[url('/images/travel.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-black/50 p-6 rounded-xl text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Explore The World 🌍
        </h1>
        <p className="text-lg">
          Find your perfect tour & travel destination
        </p>
      </div>
    </div>
  );
}