import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ProtocolRegistry from './pages/ProtocolRegistry';
import AssetRegistry from './pages/AssetRegistry';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/protocol-registry" element={<ProtocolRegistry />} />
        <Route path="/asset-registry" element={<AssetRegistry />} />
      </Routes>
    </>
  );
}

export default App;
