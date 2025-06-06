import React, { useState } from "react";

function Products() {
  const [mode, setMode] = useState("none");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id:"",
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price) return;

    const productWithId = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      id: products.length + 1,
    };

    setProducts([...products, productWithId]);
    setNewProduct({ id:"", name: "", description: "", price: "" });
    setMode("list");
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Product Overview</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        {mode !== "add" && (
          <button className="btn btn-primary" onClick={() => setMode("add")}>
            Add Product
          </button>
        )}
        {mode !== "list" && (
          <button className="btn btn-primary" onClick={() => setMode("list")}>
            List Product
          </button>
        )}
        {mode !== "none" && (
          <button className="btn btn-secondary" onClick={() => setMode("none")}>
            Cancel
          </button>
        )}
      </div>

      {mode === "add" && (
        <div className="card mx-auto p-4" style={{ maxWidth: "400px" }}>
          <h5 className="mb-3 text-start">Add a New Product</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Product ID</label>
              <input
                type="number"
                name="id"
                value={newProduct.id}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      )}

      {mode === "list" && (
        <div className="mt-4 text-start">
          <h4>List Products</h4>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No products added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Products;
