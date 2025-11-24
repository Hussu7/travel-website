import Button from "../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const matched = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // Travel hero images
  const heroImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Mountain lake
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Forest path
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Forest trees
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Tropical beach
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'  // Desert landscape
  ];
  
  //api call
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/blogs");
      if (response.data.status === 200) {
        setBlogs(response.data.data);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubscribe = () => {
    if (email && matched) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-slide effect
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Full Viewport Hero Slider */}
      <section className="relative h-screen overflow-hidden -mt-20">
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Travel destination ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          </div>
        ))}
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Explore the World
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Discover breathtaking destinations, travel tips, and unforgettable adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/blog" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Exploring
              </Link>
              <Link 
                to="/about" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 right-8 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Latest Travel Stories</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Discover amazing destinations through our curated travel experiences</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.length > 0 &&
              blogs.slice(0, 3).map((blog, index) => {
                return (
                  <div key={blog._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <div className="relative">
                      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{blog.title}</h3>
                      <p className="text-teal-600 font-medium mb-3">{blog.subTitle}</p>
                      <div 
                        className="text-slate-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: blog.description && blog.description.length > 120
                            ? `${blog.description.slice(0, 120)}...`
                            : blog.description
                        }}
                      />
                      <Link 
                        to={`/blog/${blog._id}`} 
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                      >
                        Read More 
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Your Travel Journey Starts Here</h2>
              <p className="text-slate-600 mb-4 text-lg leading-relaxed">
                Welcome to Travel8848, your ultimate destination for travel inspiration, guides, and unforgettable experiences. We're passionate about exploring the world and sharing the magic of travel with fellow adventurers.
              </p>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                From hidden gems to popular destinations, our curated content helps you discover amazing places, plan perfect trips, and create memories that last a lifetime.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Discover Our Story
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Travel planning" 
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">50+ Destinations</p>
                    <p className="text-slate-500 text-sm">Explored & Shared</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Travel8848?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">We're more than just a travel blog - we're your complete travel companion</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Detailed Travel Guides</h3>
              <p className="text-slate-600 leading-relaxed">Comprehensive destination guides with insider tips, local secrets, and practical travel advice.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-green-50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Photography Tips</h3>
              <p className="text-slate-600 leading-relaxed">Learn how to capture stunning travel photos and preserve your memories in the most beautiful way.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Budget Planning</h3>
              <p className="text-slate-600 leading-relaxed">Smart strategies to travel more while spending less, with detailed budget breakdowns and money-saving tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers who trust Travel8848 for their journey planning and inspiration!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center bg-white text-teal-600 font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Destinations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-teal-600 transition-all"
            >
              Plan Your Trip
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-800 text-white relative">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Never Miss an Adventure</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Get exclusive travel tips, destination guides, and early access to our latest stories delivered straight to your inbox
            </p>
            <div className="max-w-md mx-auto">
              {subscribed ? (
                <div className="bg-teal-500 text-white p-6 rounded-2xl font-semibold text-lg flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Welcome to our travel community!
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex flex-col gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
                      className="w-full px-6 py-4 rounded-full text-slate-800 placeholder-slate-500 border-0 focus:outline-none focus:ring-2 focus:ring-teal-400 text-center font-medium"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 cursor-pointer"
                    >
                      Start My Journey
                    </button>
                    {email && !matched && (
                      <p className="text-red-300 text-sm flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;