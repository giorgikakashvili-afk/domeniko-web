import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff4ec]">
      <Header />
      
      {/* main თეგს ვაძლევთ flex-grow-ს, რომ ფუტერი სულ დაბლა იყოს */}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;