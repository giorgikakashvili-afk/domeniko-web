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
    // მონაცემების წამოღება კონკრეტული ID-ით
    fetch(`https://rost.ge/api/professions/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(result => {
        // მნიშვნელოვანი: თუ API აბრუნებს მასივს, ვიღებთ პირველ ელემენტს
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profession:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="py-20 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-[#f3713d] border-solid"></div>
      <p className="mt-4 font-black text-[#f3713d] uppercase">იტვირთება...</p>
    </div>
  );

  if (!data) return <div className="py-20 text-center font-bold text-red-500">პროფესია ვერ მოიძებნა</div>;

  // სურათის ლინკის შემოწმება - თუ არ იწყება http-თი, მივუწეროთ დომენი
  const imageUrl = data.image_url?.startsWith('http') 
    ? data.image_url 
    : `https://rost.ge${data.image_url}`;

  return (
    <div className="font-noto">
      {/* Banner სექცია */}
      <div className="relative h-[350px] md:h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover" 
          alt={data.name} 
          onError={(e) => { e.target.src = 'https://placehold.co/1200x600?text=No+Image'; }}
        />
        {/* bg-gradient-to-t გამოიყენება სტანდარტულ Tailwind-ში */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-12">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="bg-white/90 p-3 rounded-2xl hover:bg-white transition-all shadow-lg group"
              >
                <ArrowLeft size={24} className="text-[#0A0521] group-hover:-translate-x-1 transition-transform" />
              </button>
              <h1 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight">
                პროფესია: {data.name}
              </h1>
            </div>
            <button className="bg-[#ffe4d1] text-[#0A0521] px-6 py-3 rounded-full flex items-center gap-3 font-black uppercase text-sm shadow-lg hover:scale-105 transition-transform">
              რჩეულებში დამატება <Heart size={20} className="text-[#f3713d]" fill="#f3713d" />
            </button>
          </div>
        </div>
      </div>

      {/* ტექსტის ბლოკი - შენი სქრინშოტის დიზაინით */}
      <div className="mt-12 space-y-8 max-w-5xl">
        <div className="bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-[40px] border border-[#f3713d]/10 shadow-sm">
          <h2 className="text-[#f3713d] font-black text-2xl uppercase mb-6 tracking-wide">
            ზოგადი აღწერა
          </h2>
          
          <div className="space-y-6 text-[#0A0521] text-lg md:text-xl leading-[1.8] font-medium opacity-90">
            <p>
              <span className="font-black text-[#f3713d]">{data.name}</span> არის თანამედროვე და პერსპექტიული მიმართულება, 
              რომელიც განეკუთვნება <span className="underline decoration-[#f3713d]/30 underline-offset-4">{data.type || 'აკადემიური'}</span> განათლების კატეგორიას.
            </p>
            
            <p>
              ჩვენს პლატფორმაზე მოცემული ინფორმაცია დაგეხმარებათ უკეთ გაიაზროთ ამ პროფესიის 
              სპეციფიკა, საჭირო უნარ-ჩვევები და კარიერული განვითარების შესაძლებლობები. 
              ეს მონაცემები სისტემაში განახლდა {new Date(data.created_at).toLocaleDateString('ka-GE')} წელს.
            </p>
          </div>
        </div>

        {/* კონსულტაციის ღილაკი */}
        <button className="inline-flex items-center gap-5 bg-[#ffe4d1] border-2 border-[#f3713d]/10 px-10 py-5 rounded-full font-black text-[#0A0521] uppercase text-lg hover:bg-[#ffd8bc] hover:border-[#f3713d]/30 transition-all group shadow-md">
          მოითხოვე კონსულტაცია ამ პროფესიაზე 
          <div className="bg-[#f3713d] p-3 rounded-full text-white group-hover:rotate-[15deg] transition-transform shadow-md">
            <Phone size={24} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfessionContent;