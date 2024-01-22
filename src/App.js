import './App.css';
import Navbar from './components/Navbar2.js';
import Home from './components/Home2.js';
import Landscapes from "./components/Landscapes.js";
import Blogs from './components/Blogs.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/landscapes" element={<Landscapes />} />
        <Route path='/travelblog/:blogKey' element={<Blogs />} />
        {/* <Route path='/travelblogs' element={<Blogs />} /> */}
      </Routes>

    </div>
  );
}

export default App;
