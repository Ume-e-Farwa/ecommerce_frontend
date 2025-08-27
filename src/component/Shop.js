import React, { useState, useEffect } from 'react';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);

  // Sample products data
  const PRODUCTS = [
    {
      id: 1,
      name: "Elegant Wedding Dress",
      price: 45,
      originalPrice: 70,
      image: "/images/7WpPXIekEzcU.jpg",
      rating: 4.5,
      reviews: 120,
      badge: "SALE",
      category: "Dresses",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Ivory", "Champagne"],
      description: "Beautiful elegant wedding dress perfect for your special day. Made with high-quality fabric and intricate detailing.",
      inStock: true
    },
    {
      id: 2,
      name: "Stylish Summer Frock",
      price: 60,
      originalPrice: 90,
      image: "/images/6N3j0yKERswN.jpg",
      rating: 4.2,
      reviews: 250,
      badge: "POPULAR",
      category: "Dresses",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink", "Blue", "Lavender"],
      description: "Comfortable and stylish summer frock perfect for casual outings and warm weather.",
      inStock: true
    },
    {
      id: 3,
      name: "Classic Denim Jacket",
      price: 25,
      originalPrice: 40,
      image: "/images/denim_jacket_main.jpg",
      rating: 4.8,
      reviews: 180,
      badge: "HOT",
      category: "Jackets",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Black", "Light Blue"],
      description: "Timeless denim jacket that goes with everything. Durable and comfortable for everyday wear.",
      inStock: false
    },
    {
      id: 4,
      name: "Traditional Ethnic Dress",
      price: 80,
      originalPrice: 120,
      image: "/images/E2z6Twy2h2XD.jpg",
      rating: 4.7,
      reviews: 300,
      badge: "NEW",
      category: "Traditional",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Green", "Golden", "Maroon"],
      description: "Beautiful traditional ethnic dress with intricate embroidery and authentic design.",
      inStock: true
    },
    {
      id: 5,
      name: "Luxury Bridal Dress",
      price: 120,
      originalPrice: 200,
      image: "/images/U5NlTq9m031U.jpg",
      rating: 4.9,
      reviews: 95,
      badge: "SALE",
      category: "Bridal",
      sizes: ["S", "M", "L"],
      colors: ["White", "Off-White", "Cream"],
      description: "Luxurious bridal dress with premium fabric and exquisite craftsmanship for your dream wedding.",
      inStock: true
    },
    {
      id: 6,
      name: "Casual Summer Dress",
      price: 50,
      originalPrice: 75,
      image: "/images/N3tgCbVlgLeS.jpg",
      rating: 4.3,
      reviews: 160,
      badge: "TREND",
      category: "Casual",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Yellow", "Blue", "White", "Coral"],
      description: "Light and breezy summer dress perfect for beach days and casual outings.",
      inStock: true
    },
    {
      id: 7,
      name: "Glamorous Party Dress",
      price: 95,
      originalPrice: 150,
      image: "/images/dress_thumb1.jpg",
      rating: 4.6,
      reviews: 210,
      badge: "HOT",
      category: "Party",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Red", "Navy", "Emerald"],
      description: "Stunning party dress that will make you stand out at any event. Perfect for special occasions.",
      inStock: true
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(PRODUCTS);
      setFilteredProducts(PRODUCTS);

      const uniqueCategories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
      setCategories(uniqueCategories);

      setLoading(false);
    }, 1000);
  }, []);

  // Filter + sort products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="shop-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <div className="container">
          <h1>Shop</h1>
          <p>Discover our amazing collection of products</p>
        </div>
      </div>

      <div className="shop-content">
        <div className="container">
          <div className="shop-layout">

            {/* Sidebar */}
            <aside className="shop-sidebar">
              <div className="filter-section">
                <h3>Search</h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-section">
                <h3>Categories</h3>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="price-slider"
                  />
                  <div className="price-display">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="shop-main">
              <div className="shop-controls">
                <div className="results-count">
                  {filteredProducts.length} products found
                </div>
                <div className="sort-controls">
                  <label>Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                      <div className="product-overlay">
                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-rating">
                        <div className="stars">
                          {renderStars(product.rating)}
                        </div>
                        <span className="rating-text">({product.reviews} reviews)</span>
                      </div>
                      <div className="product-details">
                        <span className="product-size">Sizes: {product.sizes.join(", ")}</span>
                      </div>
                      <div className="product-price">${product.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
