import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';

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
              <Route path="/products" element={<Products />} />
              {/* contact route  */}
               <Route path="/contactus" element={<Contact />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
