import React from "react";

type ProductDetails = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

function ProductCard({ name, description, price, imageUrl }: ProductDetails) {
  return (
    <div className="card h-100">
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
        
        <div className="d-flex gap-3">
          <p className="fw-bold">${price}</p>
          <div className="ms-auto">
            <span>
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </span>
            <span>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
            </span>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default ProductCard;
