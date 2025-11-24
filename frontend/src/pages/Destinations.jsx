import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Destinations() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const regions = [
    { id: "all", name: "All Regions", icon: "🌍" },
    { id: "asia", name: "Asia", icon: "🏯" },
    { id: "europe", name: "Europe", icon: "🏰" },
    { id: "americas", name: "Americas", icon: "🗽" },
    { id: "africa", name: "Africa", icon: "🦁" },
    { id: "oceania", name: "Oceania", icon: "🏄‍♂️" },
  ];

  const categories = [
    { id: "all", name: "All Types", icon: "⭐" },
    { id: "adventure", name: "Adventure", icon: "🧗‍♂️" },
    { id: "cultural", name: "Cultural", icon: "🏛️" },
    { id: "nature", name: "Nature", icon: "🌿" },
    { id: "urban", name: "City Life", icon: "🏙️" },
    { id: "beach", name: "Beach", icon: "🏖️" },
    { id: "mountain", name: "Mountains", icon: "⛰️" },
  ];

  const featuredDestinations = [
    {
      id: 1,
      name: "Nepal Himalayas",
      region: "asia",
      category: "mountain",
      description: "Experience the world's highest peaks and ancient Buddhist culture in the land of the Himalayas.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Mount Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley", "Pokhara Lakes"],
      difficulty: "Challenging",
      bestTime: "Mar-May, Sep-Nov",
      duration: "7-21 days",
      price: "from $1,200"
    },
    {
      id: 2,
      name: "Iceland Ring Road",
      region: "europe",
      category: "nature",
      description: "Discover otherworldly landscapes, geysers, waterfalls, and the Northern Lights in the land of fire and ice.",
      image: "https://images.unsplash.com/photo-1539066991497-39613a563a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Blue Lagoon", "Golden Circle", "Northern Lights", "Jokulsarlon Glacier"],
      difficulty: "Moderate",
      bestTime: "Jun-Aug, Dec-Mar",
      duration: "8-14 days",
      price: "from $2,400"
    },
    {
      id: 3,
      name: "Patagonia Adventure",
      region: "americas",
      category: "adventure",
      description: "Explore the pristine wilderness of Patagonia with its dramatic peaks, glaciers, and diverse wildlife.",
      image: "https://images.unsplash.com/photo-1544964703-d5357c6d2b4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Torres del Paine", "Perito Moreno Glacier", "Fitz Roy", "Ushuaia"],
      difficulty: "Challenging",
      bestTime: "Nov-Mar",
      duration: "10-16 days",
      price: "from $3,200"
    },
    {
      id: 4,
      name: "Japanese Culture Trail",
      region: "asia",
      category: "cultural",
      description: "Immerse yourself in ancient traditions, modern innovation, and exquisite cuisine across Japan.",
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Kyoto Temples", "Tokyo Culture", "Mount Fuji", "Hiroshima Peace Memorial"],
      difficulty: "Easy",
      bestTime: "Mar-May, Sep-Nov",
      duration: "10-14 days",
      price: "from $2,800"
    },
    {
      id: 5,
      name: "African Safari",
      region: "africa",
      category: "nature",
      description: "Witness the incredible wildlife of East Africa in their natural habitat across Kenya and Tanzania.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Serengeti Migration", "Masai Mara", "Ngorongoro Crater", "Mount Kilimanjaro"],
      difficulty: "Moderate",
      bestTime: "Jun-Oct",
      duration: "7-14 days",
      price: "from $3,800"
    },
    {
      id: 6,
      name: "Greek Islands Hopping",
      region: "europe",
      category: "beach",
      description: "Sail through the crystal-clear waters of the Aegean Sea and discover ancient history and stunning beaches.",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Santorini Sunsets", "Mykonos Beaches", "Crete History", "Rhodes Medieval City"],
      difficulty: "Easy",
      bestTime: "Apr-Jun, Sep-Oct",
      duration: "7-12 days",
      price: "from $1,800"
    },
    {
      id: 7,
      name: "New Zealand Adventure",
      region: "oceania",
      category: "adventure",
      description: "Experience adrenaline-pumping activities amidst breathtaking landscapes in the adventure capital of the world.",
      image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Queenstown Adventure", "Milford Sound", "Franz Josef Glacier", "Rotorua Geothermal"],
      difficulty: "Moderate",
      bestTime: "Oct-Apr",
      duration: "10-16 days",
      price: "from $3,500"
    },
    {
      id: 8,
      name: "Peru Inca Trail",
      region: "americas",
      category: "cultural",
      description: "Follow ancient Inca paths to the mystical city of Machu Picchu and explore Peru's rich heritage.",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Machu Picchu", "Cusco Colonial City", "Sacred Valley", "Lake Titicaca"],
      difficulty: "Challenging",
      bestTime: "May-Sep",
      duration: "8-12 days",
      price: "from $2,200"
    },
    {
      id: 9,
      name: "Morocco Imperial Cities",
      region: "africa",
      category: "cultural",
      description: "Journey through the exotic markets, palaces, and desert landscapes of Morocco's imperial cities.",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Marrakech Medina", "Fes Tanneries", "Sahara Desert", "Chefchaouen Blue City"],
      difficulty: "Easy",
      bestTime: "Oct-Apr",
      duration: "8-14 days",
      price: "from $1,600"
    }
  ];

  const filteredDestinations = featuredDestinations.filter(dest => {
    const regionMatch = selectedRegion === "all" || dest.region === selectedRegion;
    const categoryMatch = selectedCategory === "all" || dest.category === selectedCategory;
    return regionMatch && categoryMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "from-green-500 to-emerald-500";
      case "Moderate": return "from-yellow-500 to-orange-500";
      case "Challenging": return "from-red-500 to-pink-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Amazing destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center text-white max-w-5xl px-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            From towering peaks to pristine beaches, ancient cultures to modern adventures - explore the world's most incredible destinations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Plan Your Adventure
            </Link>
            <Link 
              to="/blog" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Read Travel Stories
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        {/* Introduction */}
        <section className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            World-Class Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Where Will Your Journey Take You?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From the snow-capped peaks of the Himalayas to the pristine beaches of the Greek islands, 
            we've curated the world's most extraordinary destinations for unforgettable adventures.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Find Your Perfect Destination</h3>
            
            {/* Region Filters */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-slate-700 mb-4">By Region</h4>
              <div className="flex flex-wrap gap-3">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      selectedRegion === region.id
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-400/30"
                        : "bg-white/70 text-slate-700 hover:bg-white/90 border border-white/30"
                    }`}
                  >
                    <span>{region.icon}</span>
                    <span className="font-medium">{region.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <h4 className="text-lg font-semibold text-slate-700 mb-4">By Experience</h4>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-400/30"
                        : "bg-white/70 text-slate-700 hover:bg-white/90 border border-white/30"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Counter */}
        <div className="text-center mb-12">
          <p className="text-xl text-slate-600">
            <span className="inline-flex items-center gap-2">
              ✨ Showing <span className="font-bold text-teal-600">{filteredDestinations.length}</span> 
              amazing {filteredDestinations.length === 1 ? "destination" : "destinations"}
            </span>
          </p>
        </div>

        {/* Destinations Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getDifficultyColor(destination.difficulty)} shadow-lg`}>
                      {destination.difficulty}
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-semibold">
                    {destination.price}
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>🕒</span> {destination.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📅</span> {destination.bestTime}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {destination.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                          +{destination.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      to="/contact"
                      className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-105 text-center shadow-lg"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/blog"
                      className="px-4 py-3 border-2 border-teal-500 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 py-20 rounded-3xl text-center text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Explore the World?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-cyan-100 leading-relaxed">
                Let our travel experts create a personalized adventure that matches your dreams and budget
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-teal-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg"
                >
                  Plan My Adventure →
                </Link>
                <Link
                  to="/tips"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-semibold px-8 py-4 rounded-full transition-all text-lg"
                >
                  Travel Tips & Guides
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Destinations;