import React from "react";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer min-w-40 sm:w-48 border">
      <img src={image} alt={title} className="h-28 w-full object-cover hover:scale-110 transition-all duration-300" />
      <div className="p-3 text-center">
        <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
