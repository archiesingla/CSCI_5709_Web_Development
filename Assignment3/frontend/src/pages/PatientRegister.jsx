import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../components/styles/main.css";

function PatientRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', gender: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/patients/register', formData);
      alert("Patient registered successfully!");
      navigate('/login');
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card p-5">
        <h2 className="text-center mb-4 text-gradient">Patient Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            required
          />
          <select
            className="form-control mb-4"
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button className="btn btn-outline-light w-100 login-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientRegister;
