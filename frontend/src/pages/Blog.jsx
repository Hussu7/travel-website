import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Stories", icon: "🌍" },
    { id: "adventure", name: "Adventure", icon: "🏔️" },
    { id: "culture", name: "Culture", icon: "🏛️" },
    { id: "food", name: "Food & Drink", icon: "🍜" },
    { id: "tips", name: "Travel Tips", icon: "💡" },
    { id: "photography", name: "Photography", icon: "📸" },
  ];

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:2000/blogs");
      if (response.data.status === 200) {
        setBlogs(response.data.data);
        setFilteredBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on search term and category
  useEffect(() => {
    let filtered = blogs;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.category === selectedCategory
      );
    }
    
    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, blogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Travel stories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
            Travel Stories
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-200 leading-relaxed">
            Discover amazing adventures, insider tips, and inspiring journeys from around the world
          </p>
          <p className="text-cyan-200 text-lg">
            <span className="inline-flex items-center gap-2">
              📖 {blogs.length} stories shared • 🌍 Endless inspiration
            </span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {/* Search and Filter Section */}
        <div className="mb-16">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search travel stories, destinations, tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-white/30 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all text-slate-800 placeholder-slate-500 shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-400/30"
                    : "bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white/90 border border-white/30"
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div>
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-slate-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-slate-300 rounded mb-3"></div>
                    <div className="h-3 bg-slate-300 rounded mb-2"></div>
                    <div className="h-16 bg-slate-300 rounded mb-4"></div>
                    <div className="h-10 bg-slate-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <p className="text-xl text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    ✨ Showing <span className="font-bold text-teal-600">{filteredBlogs.length}</span> 
                    {filteredBlogs.length === 1 ? " story" : " stories"}
                    {selectedCategory !== "all" && (
                      <span className="text-slate-500">
                        in <span className="font-semibold text-teal-600">
                          {categories.find(c => c.id === selectedCategory)?.name}
                        </span>
                      </span>
                    )}
                  </span>
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => {
                  const travelImages = [
                    `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
                    `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
                    `https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
                    `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
                    `https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
                    `https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
                  ];
                  const imageUrl = travelImages[index % travelImages.length];
                  
                  return (
                    <div
                      key={blog._id}
                      className="group bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={blog.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            {categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h2>
                        
                        {blog.subTitle && (
                          <h3 className="text-sm font-semibold mb-3 text-teal-600">
                            {blog.subTitle}
                          </h3>
                        )}
                        
                        <div 
                          className="text-slate-600 mb-6 leading-relaxed line-clamp-3"
                          dangerouslySetInnerHTML={{ 
                            __html: blog.description && blog.description.length > 120
                              ? `${blog.description.slice(0, 120)}...`
                              : blog.description 
                          }}
                        />
                        
                        <Link
                          to={`/blog/${blog._id}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl group"
                        >
                          Read Story
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="mb-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No Stories Found</h3>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                  We couldn't find any travel stories matching your search. Try different keywords or explore all categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore All Stories
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;

/* Add these CSS classes to your index.css or Tailwind config */
/* 
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
*/


