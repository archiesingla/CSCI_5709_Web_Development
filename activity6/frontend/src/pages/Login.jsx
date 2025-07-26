import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
    // sending data to back end 
      const response = await fetch("https://activity6.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // add token in localStorage
        localStorage.setItem("token", data.token);
        // routing to the products page on successful login 
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/products");
        }, 1500); 
        
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{textAlign:"center"}}>Login</h2>
      {/* show the error or success message  */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} placeholder='Your Email Address' required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} placeholder='Your Password' required />
        </div>
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
