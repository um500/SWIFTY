"use client";

interface Category {
  _id: string;
  title: string;
  icon?: string;
}

interface Props {
  categories: Category[];
}

export default function CustomizedDropdown({ categories = [] }: Props) {
  return (
    <div className="absolute left-0 top-full w-[280px] bg-white shadow-2xl rounded-lg p-4 z-50">

      <h3 className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wide">
        THEMED EXPERIENCES
      </h3>

      <div className="flex flex-col gap-2">
        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm">No categories found</p>
        ) : (
          categories.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-blue-50 transition-all"
            >
              {/* ICON */}
              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-4 h-4 object-contain"
                  />
                ) : (
                  <span>✈️</span>
                )}
              </div>

              {/* TITLE */}
              <span className="text-sm text-gray-800 font-medium">
                {item.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}