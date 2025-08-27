// src/components/Products.js
import React from "react";
import { Link } from "react-router-dom";
import PRODUCTS from "../data/products";

const Products = ({ addToCart }) => {
  return (
    <div className="products-page container">
      <h2 className="text-center my-4">All Products</h2>
      <div className="row">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>

                <button
                  className="btn btn-primary me-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-outline-secondary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
