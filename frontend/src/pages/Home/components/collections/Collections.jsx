import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Collections = ({ data }) => {
  // Add to Cart logic (shared for all categories)
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.count += 1;
      existing.total = existing.count * existing.price;
    } else {
      cart.push({ ...product, count: 1, total: product.price });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  };

  // Add to Wishlist logic (shared for all categories)
  const handleAddToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.find((item) => item._id === product._id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      window.dispatchEvent(new Event('storage'));
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Scroll carousel to currentIndex
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const child = carousel.children[currentIndex];
      if (child) {
        carousel.scrollTo({
          left: child.offsetLeft - carousel.offsetWidth / 2 + child.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1));
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="flex justify-start p-2 m-2 text-2xl">All Products</h1>
      <div className="w-full">
        <ul
          ref={carouselRef}
          className="w-full h-[300px] flex items-center overflow-x-auto scroll-smooth snap-x snap-mandatory items-center gap-4 px-10"
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          {data.map((p, i) => (
            <li key={p._id}>
              <Link to={`/products/${p._id}`} className="block group min-w-[200px] h-[200px] border flex flex-col items-center justify-center p-2 snap-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                {p.image && p.image.length > 0 ? (
                  <img
                    src={p.image[0]}
                    alt={p.title || p.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2 text-gray-500">
                    No Image
                  </div>
                )}
                <div className="font-medium text-center">{p.title || p.name}</div>
                <div className="text-green-600 font-bold">${p.price}</div>
              </Link>
              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleAddToCart(p)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                  onClick={() => handleAddToWishlist(p)}
                >
                  Add to Wishlist
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-1">
          <button
            onClick={prev}
            className="bg-gray-800 text-white px-2 py-1 rounded-l hover:bg-gray-700"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="z-10 bg-gray-800 text-white px-2 py-1 rounded-r hover:bg-gray-700"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
