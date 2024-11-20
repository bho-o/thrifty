
import React, { useState } from 'react';
import { Shirt, ShoppingCart, Filter, X } from 'lucide-react';
import Cart from './Cart';  
import "./shop.css";

const initialProducts = [
  {
    id: 1,
    name: 'Spring Comfort Shirt',
    price: 49.99,
    category: 'Spring',
    color: 'Blue',
    size: 'M',
    image: <img src="../Assets/home.jpeg" alt="Smart Casual Blazer" />
  },
  {
    id: 2,
    name: 'Smart Casual Blazer',
    price: 129.99,
    category: 'Smart',
    color: 'Gray',
    size: 'L',
    image: <img src="/assets/home.jpg" alt="Smart Casual Blazer" />
  },
  {
    id: 3,
    name: 'Modern Denim Jacket',
    price: 89.99,
    category: 'Modern',
    color: 'Blue',
    size: 'S',
    image: <Shirt color="#4B5563" size={100} />
  },
  {
    id: 4,
    name: 'Classic White Tee',
    price: 24.99,
    category: 'Classic',
    color: 'White',
    size: 'XL',
    image: <Shirt color="#FFFFFF" size={100} />
  },
  {
    id: 5,
    name: 'Urban Tech Hoodie',
    price: 79.99,
    category: 'Modern',
    color: 'Black',
    size: 'M',
    image: <Shirt color="#111827" size={100} />
  },
  {
    id: 6,
    name: 'Elegant Summer Dress',
    price: 99.99,
    category: 'Spring',
    color: 'Pink',
    size: 'L',
    image: <Shirt color="#EC4899" size={100} />
  }
];

function App() {
  const [products] = useState(initialProducts);
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    priceRange: [0, 200]
  });
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
  };

  const handlePriceChange = (min, max) => {
    setFilters(prev => ({...prev, priceRange: [min, max]}));
  };

  const removeFilter = (filterType, value) => {
    handleFilterChange(filterType, value);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
    console.log(`Added ${product.name} to cart`);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.categories.length === 0 || 
      filters.categories.includes(product.category);
    const colorMatch = filters.colors.length === 0 || 
      filters.colors.includes(product.color);
    const sizeMatch = filters.sizes.length === 0 || 
      filters.sizes.includes(product.size);
    const priceMatch = product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];

    return categoryMatch && colorMatch && sizeMatch && priceMatch;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Filter */}
      <aside className="w-64 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Filter className="mr-2" /> Filters
        </h2>

        {/* Active Filters */}
        <div className="mb-4">
          {[...filters.categories, ...filters.colors, ...filters.sizes].map(filter => (
            <span 
              key={filter} 
              className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              {filter}
              <button 
                onClick={() => {
                  if (initialProducts.some(p => p.category === filter)) removeFilter('categories', filter);
                  if (initialProducts.some(p => p.color === filter)) removeFilter('colors', filter);
                  if (initialProducts.some(p => p.size === filter)) removeFilter('sizes', filter);
                }}
                className="ml-2"
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Category</h5>
          {[...new Set(initialProducts.map(p => p.category))].map(category => (
            <label key={category} className="block">
              <input 
                type="checkbox" 
                checked={filters.categories.includes(category)}
                onChange={() => handleFilterChange('categories', category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>

        {/* Color Filter */}
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Color</h5>
          {[...new Set(initialProducts.map(p => p.color))].map(color => (
            <label key={color} className="block">
              <input 
                type="checkbox" 
                checked={filters.colors.includes(color)}
                onChange={() => handleFilterChange('colors', color)}
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>

        {/* Size Filter */}
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Size</h5>
          {[...new Set(initialProducts.map(p => p.size))].map(size => (
            <label key={size} className="block">
              <input 
                type="checkbox" 
                checked={filters.sizes.includes(size)}
                onChange={() => handleFilterChange('sizes', size)}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>

        {/* Price Range Filter */}
        <div>
          <h5 className="font-semibold mb-2">Price Range</h5>
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <button 
          onClick={toggleCart} 
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <ShoppingCart size={20} className="inline mr-2" />
          {showCart ? "Go Back" : `View Cart (${cartItems.length})`}
        </button>

        {showCart ? (
          <Cart items={cartItems} updateCart={setCartItems} />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-4 flex justify-center items-center h-48">
        {product.image}
      </div>
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
          <button 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} className="mr-2" /> Add to Cart
          </button>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          <span className="mr-2">Color: {product.color}</span>
          <span>Size: {product.size}</span>
        </div>
      </div>
    </div>
  );
}

export default App;