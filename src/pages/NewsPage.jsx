import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, Loader2, SearchX, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ყველა');

  // ფილტრების სია
  const categories = ['ყველა', 'ტესტები', 'ონლაინ შეხვედრები', 'პრეზენტაციები'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://rost.ge/api/news');
        const result = await response.json();
        const data = result.data || result;
        const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNews(sorted);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // ფილტრაციის ლოგიკა
  const filteredNews = news.filter((item, index) => {
    // თუ "ყველაა" არჩეული, პირველ (Hero) ელემენტს გამოვტოვებთ სიიდან, დანარჩენს ვაჩვენებთ
    // თუ კონკრეტული ფილტრია, Hero-ს წესს ვაუქმებთ და ვაჩვენებთ ყველაფერს, რაც კატეგორიას ემთხვევა
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'ყველა' || item.category === activeFilter || item.type === activeFilter;

    if (activeFilter === 'ყველა') {
      return index !== 0 && matchesSearch;
    }
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff4ec]">
      <Loader2 className="w-12 h-12 text-[#f3713d] animate-spin" />
    </div>
  );

  const heroNews = news[0];

  return (
    <div className="min-h-screen bg-[#fff4ec] font-noto pb-20">
      
      {/* 1. ზედა ფილტრები - შენი მოთხოვნილი კატეგორიებით */}
      <div className="max-w-8xl mx-auto pt-10 px-4 md:px-10 flex flex-wrap gap-3 mb-8">
        {categories.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all border shadow-sm ${
              activeFilter === filter 
              ? 'bg-[#f3713d] text-white border-[#f3713d]' 
              : 'bg-white text-[#2d1b4d] border-transparent hover:border-[#f3713d]/30'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-10">
        
        {/* 2. HERO სექცია - ჩანს მხოლოდ მაშინ, როცა "ყველა" არის არჩეული და ძებნა ცარიელია */}
        {heroNews && activeFilter === 'ყველა' && searchQuery === '' && (
          <div className="bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row mb-12 shadow-sm border border-white group">
            <div className="md:w-1/2 h-[300px] md:h-[450px] overflow-hidden">
              <img src={heroNews.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[#f3713d] font-bold text-sm mb-4 uppercase tracking-wider">
                {new Date(heroNews.created_at).toLocaleDateString('ka-GE')}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#2d1b4d] mb-6 leading-tight uppercase">
                {heroNews.name}
              </h1>
              <div 
                className="text-gray-500 line-clamp-3 mb-8 text-lg"
                dangerouslySetInnerHTML={{ __html: heroNews.text }}
              />
              <Link 
                to={`/news/${heroNews.id}`}
                className="bg-[#f3713d] text-white px-8 py-4 rounded-full font-bold w-fit flex items-center gap-3 hover:bg-[#e65a2b] transition-colors shadow-lg shadow-[#f3713d]/20"
              >
                სრულად ნახვა <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        )}

        {/* 3. საძიებო ველი */}
        <div className="relative mb-12">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="მოძებნე სიახლე..."
            className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white shadow-sm border-none focus:ring-2 focus:ring-[#f3713d]/20 outline-none font-bold placeholder:text-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 4. სიახლეების ბადე */}
        <div className="mb-6">
            <h2 className="text-2xl font-black text-[#2d1b4d] uppercase mb-8">
                {activeFilter === 'ყველა' ? 'ბოლო ამბები' : activeFilter}
            </h2>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`}
                className="bg-white rounded-[30px] p-3 flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="aspect-[4/3] rounded-[25px] overflow-hidden mb-4">
                  <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <div className="px-2 pb-4 flex flex-col flex-1">
                  <span className="text-gray-400 text-[11px] font-bold mb-2 uppercase">
                    {new Date(item.created_at).toLocaleDateString('ka-GE')}
                  </span>
                  <h3 className="text-[#2d1b4d] font-black text-sm mb-3 line-clamp-2 leading-snug uppercase group-hover:text-[#f3713d] transition-colors">
                    {item.name}
                  </h3>
                  <div 
                    className="text-gray-500 text-xs line-clamp-3 mb-4 flex-1 font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                  <div className="flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-[#fff4ec] text-[#f3713d] flex items-center justify-center group-hover:bg-[#f3713d] group-hover:text-white transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 rounded-[40px] border-2 border-dashed border-gray-200">
            <SearchX size={60} className="mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">შედეგი ვერ მოიძებნა</p>
          </div>
        )}

        {/* პაგინაცია */}
        {filteredNews.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-16">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-400 hover:text-[#f3713d] shadow-sm transition-all"><ChevronLeft size={20} /></button>
            {[1, 2, 3].map((p) => (
                <button key={p} className={`w-10 h-10 rounded-xl font-black text-sm transition-all shadow-sm ${p === 1 ? 'bg-[#2d1b4d] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>
                {p}
                </button>
            ))}
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-400 hover:text-[#f3713d] shadow-sm transition-all"><ChevronRight size={20} /></button>
            </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;