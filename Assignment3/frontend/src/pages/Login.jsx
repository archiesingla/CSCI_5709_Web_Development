import React, { useState, useCallback  } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "../components/styles/main.css";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const role = decoded.sub?.role;

      if (!role) throw new Error("Role not found in token");

      alert("Login successful!");

      if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/doctor/dashboard');
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Check credentials.");
    }
  }, [formData, navigate]);


  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card p-5">
        <h2 className="text-center mb-4 text-gradient">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-4"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="btn btn-outline-light w-100 login-btn" type="submit">
            Login
          </button>
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-light small">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Login);

