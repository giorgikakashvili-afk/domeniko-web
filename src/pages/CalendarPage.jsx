import React, { useState, useEffect } from 'react';
import { Calendar, Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const initFetch = async () => {
      try {
        const response = await fetch('https://rost.ge/api/calendar');
        const result = await response.json();
        const rawData = result.data || result;
        
        if (Array.isArray(rawData)) {
          const dynamicCategories = rawData.map(item => ({
            id: item.id,
            name: item.name
          }));
          setCategories(dynamicCategories);
          setData(rawData);
        }
      } catch (error) {
        console.error("Initial fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    initFetch();
  }, []);

  const fetchFilteredData = async (categoryId) => {
    setLoading(true);
    setActiveCategory(categoryId);
    const url = categoryId 
      ? `https://rost.ge/api/calendar?category_id=${categoryId}`
      : 'https://rost.ge/api/calendar';
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      const finalData = result.data || result;
      setData(Array.isArray(finalData) ? finalData : [finalData]);
    } catch (error) {
      console.error("Filter error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <div className="min-h-screen bg-[#FFF4EC] font-noto pb-20 selection:bg-[#f3713d]/20 relative overflow-hidden">
      
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {/* იასამნისფერი რგოლი - ზედა სექციისთვის */}
        <div className="absolute top-[150px] md:top-[120px] -right-[37px] w-[300px] h-[300px] md:w-[480px] md:h-[480px] bg-purple-400/65 rounded-full blur-[120px]"></div>

        {/* ყვითელი რგოლი - სერვისების სექციის სიმაღლეზე */}
        <div className="absolute top-[350px] md:top-[250px] -left-[20px] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-yellow-300/65 rounded-full blur-[80px]"></div>

        {/* მესამე რგოლი გვერდის ბოლოსკენ */}
        <div className="absolute bottom-[125px] right-0 w-[320px] h-[320px] md:w-[420px] md:h-[420px] bg-purple-400/65 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-8xl mx-auto px-6 md:px-20 pt-12 pb-6">
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => fetchFilteredData(null)}
              className={`px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-sm
                ${activeCategory === null ? 'bg-[#f3713d] text-white' : 'bg-white text-[#0A0521]/40 hover:bg-white/80'}`}
            >
              ყველა
            </button>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => fetchFilteredData(cat.id)}
                className={`px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-sm
                  ${activeCategory === cat.id ? 'bg-[#f3713d] text-white' : 'bg-white text-[#0A0521]/40 hover:bg-white/80'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-8xl mx-auto px-6 md:px-20">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#f3713d]" size={40} /></div>
          ) : (
            <div className="space-y-16">
              {data.map((categoryItem, cIdx) => (
                (categoryItem.dates || []).map((group, gIdx) => {
                  const groupId = `group-${categoryItem.id}-${gIdx}`;
                  const events = group.events || [];
                  const isExpanded = expandedGroups[groupId];
                  const visibleEvents = isExpanded ? events : events.slice(0, 5);

                  return (
                    <div key={groupId} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-[#f3713d] p-1.5 rounded-lg shadow-lg shadow-[#f3713d]/20">
                          <Calendar size={18} className="text-white" />
                        </div>
                        <h3 className="text-[#0A0521] font-black text-2xl md:text-3xl uppercase italic tracking-tighter">
                          {group.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {visibleEvents.map((event) => (
                          <div key={event.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-[22px] flex items-center justify-between shadow-sm border border-white hover:border-[#f3713d]/20 transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-[#f3713d] shrink-0" />
                              <div>
                                <h4 className="text-[#0A0521] font-bold text-lg leading-tight group-hover:text-[#f3713d] transition-colors">{event.name}</h4>
                                <p className="text-[#0A0521]/40 text-[11px] font-black uppercase mt-1 tracking-wider">{event.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {events.length > 5 && (
                        <button 
                          onClick={() => toggleGroup(groupId)}
                          className="mt-6 flex items-center gap-2 bg-[#f3713d] text-white px-7 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#f3713d]/30"
                        >
                          {isExpanded ? 'ნაკლების ჩვენება' : 'მეტის ჩვენება'}
                          <Plus size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
                        </button>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;