// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar2.js';
import Home from './components/Home2.js';
import DisableRightClick from './components/DisableRightClick.js';
import Blogs from './components/Blogs.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.js';
import ScrollToTopButton from './components/ScrollToTopButton.js';

function App() {
  return (

        <div className="App">
          <Navbar />
          <DisableRightClick />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/travelblog/:blogKey' element={<Blogs />} />
          </Routes>
          <ScrollToTopButton />
          <Footer />
        </div>
  );
}

export default App;
