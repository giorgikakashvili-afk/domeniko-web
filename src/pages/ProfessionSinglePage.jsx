import React from 'react';
import ProfessionContent from '../components/ProfessionContent';
import MeetSection from '../components/MeetSection';

const ProfessionSinglePage = () => {
  return (
    <div className="min-h-screen bg-[#fff4ec] py-10 px-4 md:px-10">
      <div className="max-w-8xl mx-auto">
        
        {/* მთავარი დეტალების კომპონენტი */}
        <section className="mb-20">
          <ProfessionContent />
        </section>


        <section>
          <MeetSection />
        </section>

      </div>
    </div>
  );
};

export default ProfessionSinglePage;