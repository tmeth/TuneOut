import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//add when add these pages:
//import Header from './Header';
//import About from './pages/About';
//import Contact from './pages/Contact';
//add to routes:
  //<Header />
//<Route path="/about" element={<About />} />
//<Route path="/contact" element={<Contact />} />


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
