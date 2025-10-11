import React from "react";

const ProductGrid = ({ title, products }) => (
  <div className="w-full max-w-6xl bg-white rounded shadow p-4 my-4">
    <h2 className="text-lg font-bold mb-4">{title}</h2>
    {products.length === 0 ? (
      <div className="text-gray-500">No products found.</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border rounded p-3 flex flex-col items-center">
            {p.image && (Array.isArray(p.image) ? p.image[0] : p.image) ? (
              <img src={Array.isArray(p.image) ? p.image[0] : p.image} alt={p.name || p.title} className="w-24 h-24 object-contain mb-2" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-2 text-gray-500">No Image</div>
            )}
            <div className="font-medium">{p.name || p.title}</div>
            <div className="text-green-600 font-bold">${p.price}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProductGrid;
