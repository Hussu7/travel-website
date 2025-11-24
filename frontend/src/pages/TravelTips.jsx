import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TravelTips() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  const tipCategories = [
    { id: "all", name: "All Tips", icon: "💡", color: "from-purple-500 to-pink-500" },
    { id: "packing", name: "Packing", icon: "🧳", color: "from-blue-500 to-cyan-500" },
    { id: "safety", name: "Safety", icon: "🛡️", color: "from-red-500 to-orange-500" },
    { id: "budget", name: "Budget", icon: "💰", color: "from-green-500 to-emerald-500" },
    { id: "health", name: "Health", icon: "🏥", color: "from-teal-500 to-blue-500" },
    { id: "culture", name: "Culture", icon: "🌍", color: "from-indigo-500 to-purple-500" },
    { id: "transport", name: "Transport", icon: "✈️", color: "from-sky-500 to-blue-500" },
    { id: "tech", name: "Technology", icon: "📱", color: "from-violet-500 to-purple-500" },
  ];

  const travelTips = [
    {
      id: 1,
      category: "packing",
      title: "The Ultimate Packing Checklist",
      description: "Master the art of packing light while having everything you need for any adventure.",
      content: [
        "Roll clothes instead of folding to save 30% more space",
        "Pack one week's worth of clothes regardless of trip length",
        "Choose versatile pieces that mix and match easily",
        "Pack essentials in your carry-on in case luggage gets lost",
        "Use packing cubes to organize and compress items",
        "Leave room for souvenirs - pack 20% less than capacity"
      ],
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy",
      readTime: "5 min read"
    },
    {
      id: 2,
      category: "safety",
      title: "Stay Safe While Exploring",
      description: "Essential safety tips to ensure your adventures remain memorable for all the right reasons.",
      content: [
        "Research local laws and customs before arrival",
        "Share your itinerary with someone at home",
        "Keep copies of important documents in separate places",
        "Register with your embassy in high-risk destinations",
        "Trust your instincts - if something feels wrong, leave",
        "Keep emergency contacts easily accessible"
      ],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Essential",
      readTime: "7 min read"
    },
    {
      id: 3,
      category: "budget",
      title: "Travel More for Less",
      description: "Proven strategies to stretch your travel budget without compromising on experiences.",
      content: [
        "Book flights on Tuesday and Wednesday for best deals",
        "Use price comparison tools and set up fare alerts",
        "Stay in hostels, homestays, or house-sit for free accommodation",
        "Cook your own meals occasionally to save money",
        "Look for free walking tours and city activities",
        "Travel during shoulder seasons for lower prices"
      ],
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Moderate",
      readTime: "6 min read"
    },
    {
      id: 4,
      category: "health",
      title: "Staying Healthy on the Road",
      description: "Keep yourself in top condition throughout your travels with these health and wellness tips.",
      content: [
        "Get travel vaccinations 4-6 weeks before departure",
        "Pack a comprehensive first aid kit",
        "Stay hydrated and avoid tap water in certain regions",
        "Carry hand sanitizer and use it frequently",
        "Get travel insurance - it's worth the investment",
        "Know how to find medical help in your destination"
      ],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Important",
      readTime: "8 min read"
    },
    {
      id: 5,
      category: "culture",
      title: "Cultural Etiquette Around the World",
      description: "Navigate different cultures respectfully and make meaningful connections with locals.",
      content: [
        "Learn basic greetings in the local language",
        "Research tipping customs and appropriate amounts",
        "Dress appropriately for religious and cultural sites",
        "Be mindful of photography restrictions",
        "Respect local customs around food and dining",
        "Ask before taking photos of people"
      ],
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Moderate",
      readTime: "6 min read"
    },
    {
      id: 6,
      category: "transport",
      title: "Getting Around Like a Local",
      description: "Master transportation in any destination and save money while exploring efficiently.",
      content: [
        "Download offline maps before arriving",
        "Use public transport apps for real-time information",
        "Consider ride-sharing apps as taxi alternatives",
        "Walk whenever possible to discover hidden gems",
        "Rent bikes for eco-friendly city exploration",
        "Book domestic flights early for better deals"
      ],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy",
      readTime: "5 min read"
    },
    {
      id: 7,
      category: "tech",
      title: "Essential Travel Technology",
      description: "Leverage technology to enhance your travels and stay connected around the world.",
      content: [
        "Download essential apps: Google Translate, Maps.me, Currency converter",
        "Invest in a universal power adapter",
        "Carry a portable charger for long sightseeing days",
        "Use VPN services for secure internet in public places",
        "Back up photos to cloud storage regularly",
        "Consider an international data plan or local SIM cards"
      ],
      image: "https://images.unsplash.com/photo-1512317049220-d3c6fcaf6681?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Moderate",
      readTime: "6 min read"
    },
    {
      id: 8,
      category: "packing",
      title: "Carry-On Essentials",
      description: "What to pack in your carry-on to survive flight delays and lost luggage scenarios.",
      content: [
        "Pack a change of clothes and underwear",
        "Include all medications and prescriptions",
        "Carry important documents and copies",
        "Pack phone charger and entertainment",
        "Include snacks for long flights",
        "Don't forget travel-size toiletries"
      ],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Essential",
      readTime: "4 min read"
    },
    {
      id: 9,
      category: "budget",
      title: "Free Activities in Every City",
      description: "Discover amazing experiences that won't cost you a penny in destinations worldwide.",
      content: [
        "Join free walking tours to learn local history",
        "Visit free museums on designated days",
        "Explore public parks, gardens, and beaches",
        "Attend free festivals and cultural events",
        "Take advantage of hotel and hostel activities",
        "Use apps to find free events happening locally"
      ],
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy",
      readTime: "5 min read"
    }
  ];

  const filteredTips = travelTips.filter(tip => {
    const categoryMatch = selectedCategory === "all" || tip.category === selectedCategory;
    const searchMatch = searchQuery === "" || 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "from-green-500 to-emerald-500";
      case "Moderate": return "from-yellow-500 to-orange-500";
      case "Important": return "from-blue-500 to-indigo-500";
      case "Essential": return "from-red-500 to-pink-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  const quickTips = [
    { icon: "🎒", tip: "Pack light - you'll thank yourself later", category: "Packing" },
    { icon: "💊", tip: "Always pack a basic first aid kit", category: "Health" },
    { icon: "📱", tip: "Download offline maps before you go", category: "Technology" },
    { icon: "💰", tip: "Notify your bank about travel dates", category: "Budget" },
    { icon: "🗣️", tip: "Learn 'hello' and 'thank you' in local language", category: "Culture" },
    { icon: "🔒", tip: "Make copies of important documents", category: "Safety" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Travel planning and tips"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center text-white max-w-5xl px-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
            Travel Tips & Guides
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Expert advice and insider secrets to make your travels smoother, safer, and more memorable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#tips" 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Tips
            </a>
            <Link 
              to="/destinations" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Browse Destinations
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

      <div className="container mx-auto px-6 py-20" id="tips">
        {/* Introduction */}
        <section className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Expert Travel Advice
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Travel Smarter, Not Harder
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From packing hacks to safety tips, cultural insights to budget secrets - 
            everything you need to know for successful adventures around the world.
          </p>
        </section>

        {/* Quick Tips Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-8">Quick Tips to Remember</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickTips.map((tip, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
                    <div className="text-4xl mb-3">{tip.icon}</div>
                    <p className="text-lg font-medium mb-2">{tip.tip}</p>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{tip.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search travel tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/70 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">Browse by Category</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {tipCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
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
              💡 Found <span className="font-bold text-teal-600">{filteredTips.length}</span> 
              helpful {filteredTips.length === 1 ? "tip" : "tips"} for you
            </span>
          </p>
        </div>

        {/* Travel Tips Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="group bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getDifficultyColor(tip.difficulty)} shadow-lg`}>
                      {tip.difficulty}
                    </span>
                  </div>
                  
                  {/* Read Time */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                    {tip.readTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">
                    {tip.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {tip.description}
                  </p>
                  
                  {/* Tips Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Key Tips:</h4>
                    <ul className="space-y-2">
                      {tip.content.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-teal-500 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {tip.content.length > 3 && (
                        <li className="text-sm text-slate-500 italic">
                          +{tip.content.length - 3} more tips inside...
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      to="/blog"
                      className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-105 text-center shadow-lg"
                    >
                      Read Full Guide
                    </Link>
                    <button className="px-4 py-3 border-2 border-teal-500 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all">
                      Save Tip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20">
            <div className="max-w-2xl mx-auto">
              <div className="text-4xl mb-4">📬</div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Get Weekly Travel Tips
              </h3>
              <p className="text-slate-600 mb-8 text-lg">
                Join thousands of travelers receiving expert tips, destination guides, and exclusive deals directly in their inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white/70 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-4">
                No spam, unsubscribe anytime. Your privacy is protected.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-20 rounded-3xl text-center text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Put These Tips to Use?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-pink-100 leading-relaxed">
                Start planning your next adventure with our expert guidance and personalized travel planning
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/destinations"
                  className="bg-white text-purple-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg"
                >
                  Explore Destinations →
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-semibold px-8 py-4 rounded-full transition-all text-lg"
                >
                  Plan My Trip
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

export default TravelTips;