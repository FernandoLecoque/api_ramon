import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from ' ./pages/Home';
import Locais from './pages/Locais';
import Temperaturas from './pages/Temperaturas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locais" element={<Locais />} />
        <Route path="/temperaturas" element={<Temperaturas />} />
      </Routes>
    </Router>
  );
}

export default App;
