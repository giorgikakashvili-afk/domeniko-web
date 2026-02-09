import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

const ProfessionsPage = () => {
    const [professions, setProfessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("ყველა");

    useEffect(() => {
        // მონაცემების წამოღება Profession API-დან [cite: 17, 20]
        const fetchProfessions = async () => {
            try {
                const response = await fetch('https://rost.ge/api/professions');
                const result = await response.json();
                setProfessions(result.data); // ვიღებთ მონაცემებს "data" მასივიდან [cite: 22, 23]
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfessions();
    }, []);

    // ფილტრაციის ლოგიკა
    const filteredProfessions = professions.filter((prof) => {
        const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeFilter === "ყველა" || prof.type === activeFilter;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin text-[#f3713d]" size={50} />
        </div>
    );

    return (
        <div className="min-h-screen py-12 px-4 md:px-10 font-noto">
            <div className="max-w-8xl mx-auto">

                {/* ზედა 3 კონტეინერი (ფილტრები) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { id: "ყველა", label: "ყველა პროფესია", icon: "🏛️" },
                        { id: "უმაღლესი", label: "უმაღლესი განათლება", icon: "🏛️" },
                        { id: "პროფესიული", label: "პროფესიული განათლება", icon: "🏛️" }
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`p-8 xl:py-12 rounded-[30px] flex items-center gap-6 transition-all duration-300 border-2 ${activeFilter === cat.id
                                    ? "bg-[#ffe4d1] border-[#f3713d] shadow-lg"
                                    : "bg-white border-transparent shadow-sm hover:shadow-md"
                                }`}
                        >
                            <span className="text-4xl">{cat.icon}</span>
                            <span className="text-xl md:text-2xl xl:text-4xl font-black text-[#0A0521] text-left uppercase [font-variant-caps:all-petite-caps]">
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ძებნის ველი */}
                <div className="relative mb-12 max-w-8xl">
                    <input
                        type="text"
                        placeholder="მოძებნე პროფესია"
                        className="w-full bg-white py-5 px-14 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f3713d]/20 transition-all text-lg"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                </div>

                {/* პროფესიების ბადე (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProfessions.map((prof) => (
                        <div
                            key={prof.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm border-2 border-transparent hover:border-[#f3713d]/30 transition-all group flex flex-row lg:flex-col h-auto lg:h-full"
                        >
                            {/* ფოტოს ნაწილი */}
                            <div className="relative w-2/5 lg:w-full aspect-square  md:aspect-4/3 overflow-hidden rounded-xl bg-gray-100 shrink-0">
                                <img
                                    src={prof.image_url}
                                    alt={prof.name}
                                    className="absolute text-base inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* ტექსტის ნაწილი */}
                            <div className="p-4 md:p-6 flex flex-col justify-center lg:justify-start flex-1">
                                <h3 className="text-xl md:text-2xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] mb-1 lg:mb-2 line-clamp-2">
                                    {prof.name}
                                </h3>

                                <p className="text-[#f3713d] font-bold text-[12px] md:text-sm uppercase mb-3 lg:mb-4">
                                    {prof.type || "უმაღლესი განათლება"}
                                </p>

                                {/* სტატისტიკა - მობილურზე უფრო კომპაქტური */}
                                <div className="flex flex-col gap-1 lg:gap-2 text-[#6b7280] text-[12px] md:text-[13px] font-black uppercase pt-2 lg:pt-5 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 lg:flex-nowrap">
                                        <span className="whitespace-nowrap">3 ვიდეო</span>
                                        <span className="whitespace-nowrap">5 კურსი</span>
                                        <span className="whitespace-nowrap w-full lg:w-auto">12 პროფესიონალი</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* თუ შედეგი არ მოიძებნა */}
                {filteredProfessions.length === 0 && (
                    <div className="text-center py-20 text-gray-400 text-xl font-bold">
                        სამწუხაროდ, პროფესია ვერ მოიძებნა
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionsPage;