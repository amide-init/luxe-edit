import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Docs } from './pages/Docs';
import { Contributors } from './pages/Contributors';
import 'luxe-edit/index.css';

function App() {
  // Use /luxe-edit for GitHub Pages, / for local dev
  const basename = window.location.pathname.startsWith('/luxe-edit') ? '/luxe-edit' : '/';
  
  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/contributors" element={<Contributors />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
