// Components/CategorySection.jsx
import React from 'react';

const CategorySection = ({ title, categories, bgColor = "bg-white" }) => {
  return (
    <section className={`py-12 px-4 ${bgColor}`}>
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">{title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={`/category/${category.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-32 bg-blue-200 flex items-center justify-center">
                <span className="text-3xl">{category.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-center group-hover:text-blue-700">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;