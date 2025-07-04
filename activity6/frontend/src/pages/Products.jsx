import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "http://localhost:5000/products";

function Products() {
  const [error, setError] = useState("");
  const [mode, setMode] = useState("none");
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    setMode("list");
    fetchProducts();
  }, []);

  // filter the products based on the amount and title, description 
  const fltProducts = products
  .filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  const fetchProducts = async () => {
    if (!token) {
      setError("Unauthorized: Please login to access this page.");
      return;
    }

    try {
      const response = await axios.get(BACKEND_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error while fetching the products:", error);
      if (error.response?.status === 401) {
        setError("Session expired or unauthorized. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 1500); 
      } else {
        setError("Error fetching products.");
      }
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!newProduct.name || !newProduct.price || !newProduct.id || !newProduct.description) {
    setError("All fields are required!");
    return;
  }

  if (!token) {
    setError("Unauthorized: Please login to add products.");
    return;
  }

  try {
    await axios.post(BACKEND_URL, {
      ...newProduct,
      price: parseFloat(newProduct.price),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setNewProduct({ id: "", name: "", description: "", price: "" });
    setMode("list");
    fetchProducts();
  } catch (error) {
    console.error("Add product error:", error);
    if (error.response?.status === 401) {
      setError("Session expired or unauthorized. Please login again.");
    } else if (error.response?.data?.error) {
      setError(error.response.data.error);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
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
          {error && <div className="alert alert-danger">
            {error}
          </div>}
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

          <div className="d-flex justify-content-between align-items-center mt-4">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="form-select w-25 ms-3"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort by price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name of Product</th>
                <th>Product's Description</th>
                <th>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {fltProducts.length > 0 ? (
                fltProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No products found.
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
