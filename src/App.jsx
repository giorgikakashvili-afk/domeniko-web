import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ProfessionsPage from './pages/Professions'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff4ec]">
      <ScrollToTop /> 
      
      <Header />
      
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professions" element={<ProfessionsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;