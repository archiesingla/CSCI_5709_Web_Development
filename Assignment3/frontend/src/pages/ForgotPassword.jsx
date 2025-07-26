import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/styles/main.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert(res.data.message);
      navigate('/reset-password');
      setResetToken(res.data.reset_token);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Failed to request reset"));
    }
  };

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card p-5">
        <h2 className="text-center mb-4 text-gradient">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-outline-light w-100 login-btn" type="submit">
            Send Reset Token
          </button>
        </form>
        {resetToken && (
          <div className="mt-4">
            <p><strong>Reset Token (demo only):</strong></p>
            <textarea className="form-control" rows="3" readOnly value={resetToken} />
            <p className="mt-2">
              Use this token in the <strong>Reset Password</strong> page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
