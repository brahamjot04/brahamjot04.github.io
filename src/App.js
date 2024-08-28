import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery";
import "bootstrap/dist/js/bootstrap";

import React from 'react';



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Nav from './Nav';



function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Nav' element={<Nav/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
