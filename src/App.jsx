import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ProfessionsPage from './pages/Professions';
import ProfessionSinglePage from './pages/ProfessionSinglePage';
import { AuthProvider } from './context/AuthContext';
import CalendarPage from './pages/CalendarPage';



// ამ ორი ხაზის დამატება აუცილებელია!
import Register from './pages/Register';
import Login from './pages/Login';

import SpeakersPage from './pages/SpeakersPage';

import ProfileUpdate from './components/ProfileUpdate'; // შენი ფორმის გვერდი
import Dashboard from './pages/Dashboard'; // შენი ტაიმერიანი გვერდი

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[#fff4ec]">
        <ScrollToTop />

        <Header />

        <main className="grow relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/professions" element={<ProfessionsPage />} />
            <Route path="/professions/:id" element={<ProfessionSinglePage />} />

            {/* ავტორიზაცია */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* პროფილის შევსება და მოსაცდელი გვერდი */}
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/speakers" element={<SpeakersPage />} />
            
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;