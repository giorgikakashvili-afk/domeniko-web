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
        console.log("API Response for ID:", result); // ეს ნახე კონსოლში!

        // სმარტ-ლოგიკა მონაცემების ამოსაღებად:
        if (result.data) {
          // თუ არის result.data (როგორც მთავარ გვერდზე)
          setData(Array.isArray(result.data) ? result.data[0] : result.data);
        } else if (Array.isArray(result)) {
          // თუ პირდაპირ მასივია
          setData(result[0]);
        } else {
          // თუ პირდაპირ ობიექტია
          setData(result);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="py-20 text-center font-black text-[#f3713d] animate-pulse">იტვირთება...</div>;
  
  // თუ data მაინც ცარიელია ან არ აქვს საჭირო ველები
  if (!data || (!data.name && !data.title)) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-bold">მონაცემები ვერ მოიძებნა ამ ID-ზე: {id}</p>
        <button onClick={() => navigate('/professions')} className="mt-4 text-[#f3713d] underline">
          დაბრუნდი სიის გვერდზე
        </button>
      </div>
    );
  }

  // ზოგიერთ API-ში name-ის ნაცვლად title წერია
  const displayName = data.name || data.title || "დასახელება არ არის";
  const displayType = data.type || data.category || "ზოგადი";
  
  // სურათის ლინკის დამუშავება
  const imageUrl = data.image_url 
    ? (data.image_url.startsWith('http') ? data.image_url : `https://rost.ge${data.image_url}`)
    : 'https://placehold.co/1200x600?text=No+Image';

  return (
    <div className="font-noto">
      <div className="relative h-[350px] md:h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover" 
          alt={displayName} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-12">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="bg-white/90 p-3 rounded-2xl hover:bg-white transition-all shadow-lg">
                <ArrowLeft size={24} className="text-[#0A0521]" />
              </button>
              <h1 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight">
                პროფესია: {displayName}
              </h1>
            </div>
            <button className="bg-[#ffe4d1] text-[#0A0521] px-6 py-3 rounded-full flex items-center gap-3 font-black uppercase text-sm shadow-lg">
              რჩეულებში დამატება <Heart size={20} className="text-[#f3713d]" fill="#f3713d" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6 text-[#0A0521]/80 text-lg leading-relaxed max-w-5xl">
        <div className="bg-white/50 p-8 rounded-[30px] border border-[#f3713d]/5">
           <p className="font-medium text-xl text-[#0A0521]">
            {displayName} არის სფერო, რომელიც მიეკუთვნება **{displayType}** განათლების კატეგორიას.
          </p>
        </div>
      </div>
      
      {/* ... დანარჩენი კოდი (ღილაკი და ა.შ.) ... */}
    </div>
  );
};

export default ProfessionContent;