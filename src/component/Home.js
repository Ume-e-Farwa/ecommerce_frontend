import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import PRODUCTS from "../data/products";  // ✅ correct path

const Home = () => {
  // 🔹 Unique categories extract karna PRODUCTS se
  const uniqueCategories = [...new Set(PRODUCTS.map((p) => p.category))];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Amazing Products</h1>
            <p>Find everything you need in our curated collection of premium products</p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/products" className="btn btn-secondary">Browse Products</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src={PRODUCTS[0].image} alt={PRODUCTS[0].name} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {uniqueCategories.map((cat, index) => {
              const product = PRODUCTS.find((p) => p.category === cat);
              return (
                <Link to="/shop" key={index} className="category-card">
                  <img src={product.image} alt={cat} />
                  <div className="category-overlay">
                    <h3>{cat}</h3>
                    <p>
                      {PRODUCTS.filter((p) => p.category === cat).length} products
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter and get 10% off your first order</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
