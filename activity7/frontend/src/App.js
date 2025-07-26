import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <div>
       <Router>

        {/* navbar component  */}
          <Navbar />
            <Routes>
              {/* home route  */}
              <Route path="/" element={<Home />} />
              
              {/* products route  */}
              <Route
            path="/products"
            element={
              <PrivateRoutes>
                <Products />
              </PrivateRoutes>
            }
          />
              {/* contact route  */}
               <Route path="/contactus" element={<Contact />} />

               {/* login route  */}
               <Route path="/login" element={<Login />} />

               {/* signup route  */}
               <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
