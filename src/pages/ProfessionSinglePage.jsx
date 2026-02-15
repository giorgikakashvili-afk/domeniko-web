import React from 'react';
import { useParams } from 'react-router-dom'; // დაამატე ეს
import ProfessionContent from '../components/ProfessionContent';
import MeetSection from '../components/MeetSection';

const ProfessionSinglePage = () => {
  const { id } = useParams(); // ვიღებთ პროფესიის ID-ს URL-დან

  return (
    <div className="min-h-screen bg-[#fff4ec] py-10 px-4 md:px-10">
      <div className="max-w-8xl mx-auto">
        <section className="mb-20">
          <ProfessionContent />
        </section>

        <section>
          {/* ვაწვდით professionId-ს MeetSection-ს */}
          <MeetSection professionId={id} />
        </section>
      </div>
    </div>
  );
};

export default ProfessionSinglePage;