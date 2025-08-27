// src/component/ProductDetails.js
import { useParams } from "react-router-dom";
import PRODUCTS from "../data/products";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) return <h2 className="text-center">Product not found</h2>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <button className="btn btn-success" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
