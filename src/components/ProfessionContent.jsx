import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Phone } from 'lucide-react';

const ProfessionContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rost.ge/api/professions/${id}`)
      .then(res => res.json())
      .then(result => {
        // ვამოწმებთ სტრუქტურას
        let professionData = result.data ? result.data : result;
        
        if (Array.isArray(professionData)) {
          setData(professionData[0]);
        } else {
          setData(professionData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="py-20 text-center font-black text-[#f3713d] animate-pulse uppercase">იტვირთება...</div>;
  if (!data) return <div className="py-20 text-center font-bold text-red-500">პროფესია ვერ მოიძებნა</div>;

  // ადმინ პანელიდან გამომდინარე, აღწერა არის data.text ველში
  const professionDescription = data.text;
  const displayName = data.name || "დასახელება არ არის";
  const imageUrl = data.image_url || 'https://placehold.co/1200x600?text=No+Image';

  return (
    <div className="font-noto">
      {/* Banner სექცია */}
      <div className="relative h-87.5 md:h-125 w-full rounded-[40px] overflow-hidden shadow-2xl">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover" 
          alt={displayName} 
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-12">
          <div className="max-w-8xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="bg-white/90 p-3 rounded-2xl hover:bg-white transition-all shadow-lg group">
                <ArrowLeft size={24} className="text-[#0A0521] group-hover:-translate-x-1 transition-transform" />
              </button>
              <h1 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight">
                პროფესია: {displayName}
              </h1>
            </div>
            <button className="bg-[#ffe4d1] text-[#0A0521] px-6 py-3 rounded-full flex items-center gap-3 font-black uppercase text-sm shadow-lg hover:scale-105 transition-transform">
              რჩეულებში დამატება <Heart size={20} className="text-[#f3713d]" fill="#f3713d" />
            </button>
          </div>
        </div>
      </div>

      {/* აღწერის სექცია - აქ ვიყენებთ data.text-ს */}
      <div className="mt-12 space-y-8 max-w-8xl">
        <div className="bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-[#f3713d]/10 shadow-sm">
          <h2 className="text-[#f3713d] font-black text-2xl uppercase mb-6 tracking-wide border-b border-[#f3713d]/20 pb-4 inline-block">
            პროფესიის შესახებ
          </h2>
          
          <div className="text-[#0A0521] text-lg md:text-xl leading-[1.8] font-medium opacity-90">
            {professionDescription ? (
              <div 
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: professionDescription }} 
              />
            ) : (
              <p className="italic text-gray-500">ამ პროფესიის დეტალური აღწერა მალე დაემატება.</p>
            )}
          </div>
        </div>

        {/* კონსულტაციის ღილაკი */}
        <button className="group flex items-center gap-5 bg-[#ffe4d1] border-2 border-[#f3713d]/10 px-10 py-5 rounded-full font-black text-[#0A0521] uppercase text-lg hover:bg-[#ffd8bc] hover:border-[#f3713d]/30 transition-all shadow-md">
          მოითხოვე კონსულტაცია ამ პროფესიაზე 
          <div className="bg-[#f3713d] p-3 rounded-full text-white group-hover:rotate-15 transition-transform shadow-md">
            <Phone size={24} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfessionContent;