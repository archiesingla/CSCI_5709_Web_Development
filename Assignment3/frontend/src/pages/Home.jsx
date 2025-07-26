import { Link } from 'react-router-dom';
import "../components/styles/main.css";

function Home() {
  return (
    <div className="home-container d-flex align-items-center justify-content-center vh-100">
      <div className="glass-card text-center p-5">
        <h1 className="display-3 fw-bold text-gradient mb-3">MediConnect</h1>
        <p className="lead mb-4 text-dark fw-bold">
          Revolutionizing virtual healthcare for doctors and patients.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/register/doctor" className="btn btn-outline-dark btn-lg rounded-pill px-4 shadow-sm">
            Doctor Register
          </Link>
          <Link to="/register/patient" className="btn btn-outline-dark btn-lg rounded-pill px-4 shadow-sm">
            Patient Register
          </Link>
          <Link to="/login" className="btn btn-outline-dark btn-lg rounded-pill px-4 shadow-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
