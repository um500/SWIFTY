"use client";

interface Category {
  _id: string;
  title: string;
  icon?: string; // sanity se aayega
}

interface Props {
  categories: Category[];
}

export default function CustomizedDropdown({ categories = [] }: Props) {
  return (
    <div className="absolute left-0 top-full w-[260px] bg-white shadow-xl p-4 rounded-lg z-50">

      {/* LIST */}
      <div className="flex flex-col gap-3">
        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm">No categories found</p>
        ) : (
          categories.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
            >
              {/* ICON */}
              <span className="text-lg">
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  "✈️"
                )}
              </span>

              {/* TITLE */}
              <span className="text-gray-800 text-sm font-medium">
                {item.title}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}