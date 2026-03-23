export default function MegaMenu() {
  return (
    <div className="absolute left-0 top-full w-full bg-white text-black shadow-xl p-6 z-50">
      <div className="max-w-6xl mx-auto flex">

        {/* LEFT */}
        <div className="w-1/4 border-r pr-4">
          <ul className="space-y-3 font-medium text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Africa</li>
            <li>America</li>
            <li>Asia</li>
            <li>Australia & NZ</li>
            <li>Europe</li>
            <li>Middle East</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="w-3/4 grid grid-cols-3 gap-6 pl-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Egypt</h3>
            <p>Cairo</p>
            <p>Luxor</p>
            <p>Aswan</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">South Africa</h3>
            <p>Cape Town</p>
            <p>Johannesburg</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Kenya</h3>
            <p>Masai Mara</p>
          </div>
        </div>

      </div>
    </div>
  );
}