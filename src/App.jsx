import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ProfessionsPage from './pages/Professions';
import ProfessionSinglePage from './pages/ProfessionSinglePage'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff4ec]">
      <ScrollToTop /> 
      
      <Header />
      
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professions" element={<ProfessionsPage />} />
          <Route path="/professions/:id" element={<ProfessionSinglePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;