// src/pages/Products.tsx
import React from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const products = [
    {
      name: "Wireless Headphones",
      description: "Noise cancelling over-ear headphones",
      price: 120,
      imageUrl: "https://picsum.photos/id/1018/400/200",
    },
    {
      name: "Smart Watch",
      description: "Track your health and time",
      price: 80,
      imageUrl: "https://picsum.photos/id/1019/400/200",
    },
    {
      name: "Gaming Mouse",
      description: "Ergonomic and responsive",
      price: 40,
      imageUrl: "https://picsum.photos/id/1020/400/200",
    },
  ];

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-end mb-5">
        <button className="btn btn-primary ms-auto">
         <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add Product
        </button>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
