import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Share2 } from 'lucide-react';
// დროებით დავაკომენტაროთ Helmet, თუ ის იწვევს გათეთრებას
// import { Helmet } from 'react-helmet-async'; 
import NewsSlider from './NewsSlider';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFacebookShare = () => {
    console.log("Clicked");
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://rost.ge/api/news/${id}`);
        const data = await res.json();
        setArticle(data.data || data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff4ec]">
      <Loader2 className="w-12 h-12 text-[#f3713d] animate-spin" />
    </div>
  );

  if (!article) return <div className="text-center py-20 font-noto">სიახლე ვერ მოიძებნა</div>;

  return (
    <div className="min-h-screen bg-[#fff4ec] font-noto pb-20">
      {/* თუ HelmetProvider არ გაქვს დამატებული App.jsx-ში, 
         ეს სექცია გაათეთრებს გვერდს. 
      */}
      
      <div className="max-w-8xl mx-auto px-4 md:px-12 pt-6">
        <div className="relative w-full h-87.5 md:h-125 rounded-[30px] md:rounded-[45px] overflow-hidden mb-10 shadow-xl">
          <img src={article.image_url} className="w-full h-full object-cover" alt={article.name || 'news'} />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-20">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-white/95 px-6 py-3 rounded-full flex items-center gap-2 font-bold text-[#09002f] hover:bg-[#f3713d] hover:text-white transition-all shadow-md text-sm uppercase"
            >
              <ArrowLeft size={18} /> უკან
            </button>

            <button 
              onClick={handleFacebookShare} 
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-full flex items-center gap-3 font-bold hover:bg-white/30 transition-all group"
            >
              გაზიარება <Share2 size={20} className="text-[#f3713d] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        <div className="max-w-8xl mx-auto px-2 mb-20">
          <span className="text-[#f3713d] font-bold text-sm uppercase mb-4 block">
            {article.created_at ? new Date(article.created_at).toLocaleDateString('ka-GE') : ''}
          </span>
          <h1 className="text-2xl md:text-5xl font-black text-[#09002f] mb-8 uppercase italic tracking-tight">
            {article.name}
          </h1>
          
          {/* დავამატოთ დაცვა, რომ ტექსტი თუ არ მოვიდა, არ გაითიშოს */}
          <div className="prose prose-lg max-w-none text-[#09002f]/80 leading-relaxed font-medium space-y-6"
               dangerouslySetInnerHTML={{ __html: article.text || article.description || "" }} />
          
          <button 
            onClick={handleFacebookShare} 
            className="mt-12 bg-[#ffe4d1] text-[#09002f] px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-[#f3713d] hover:text-white transition-all uppercase text-sm"
          >
            გაზიარება <Share2 size={18} />
          </button>
        </div>

        <NewsSlider excludeId={id} />
      </div>
    </div>
  );
};

export default NewsDetail;