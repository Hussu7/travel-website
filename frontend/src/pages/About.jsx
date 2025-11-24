import Button from "../components/Button";
import { Link } from "react-router-dom";
  import { useState, useEffect } from "react";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Emma Rodriguez",
      role: "Travel Director",
      expertise: "Adventure Planning, Cultural Immersion",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "James Chen",
      role: "Destination Expert",
      expertise: "Asia-Pacific, Photography",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Sofia Andersson",
      role: "Adventure Guide",
      expertise: "Mountain Expeditions, Safety",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
  ];

  const values = [
    { 
      icon: "🌍", 
      title: "Explore Together", 
      description: "Discover incredible destinations and create unforgettable memories with fellow travelers",
      color: "from-teal-400 to-cyan-400"
    },
    { 
      icon: "✈️", 
      title: "Adventure Awaits", 
      description: "Experience authentic adventures and embrace the unknown with confidence and excitement",
      color: "from-blue-400 to-purple-400"
    },
    { 
      icon: "🤝", 
      title: "Connect Cultures", 
      description: "Build meaningful connections with local communities and fellow adventurers worldwide",
      color: "from-green-400 to-teal-400"
    },
  ];

  const stats = [
    { number: "150+", label: "Countries Explored", icon: "🗺️" },
    { number: "50K+", label: "Happy Travelers", icon: "😊" },
    { number: "1000+", label: "Adventures Created", icon: "🎒" },
    { number: "25+", label: "Years Experience", icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Mountain adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center text-white max-w-4xl px-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
            About Travel8848
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Where every journey becomes an extraordinary story and every destination opens new horizons
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </Link>
            <Link 
              to="/blog" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Read Our Stories
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
        {/* Our Story Section */}
        <section className="mb-32">
          <div className="md:flex md:items-center md:space-x-16">
            {/* Text */}
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Passion for Adventure
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Founded in 1999, Travel8848 began as a dream shared by adventurous souls who believed that travel has the power to transform lives, bridge cultures, and create lasting memories.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                From humble beginnings organizing local hiking trips to becoming a global adventure travel company, we've maintained our core mission: making authentic travel experiences accessible to everyone.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Today, we're proud to have helped over 50,000 travelers discover the world's most incredible destinations while fostering meaningful connections and unforgettable adventures.
              </p>
              <Button text="Join Our Adventure" link="/contact" />
            </div>

            {/* Image Grid */}
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Mountain landscape"
                    className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Ocean view"
                    className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Forest path"
                    className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Adventure"
                    className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-32">
          <div className="bg-white/50 backdrop-blur-sm p-12 md:p-16 rounded-3xl shadow-xl border border-white/20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Purpose
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Driven by passion, guided by purpose, committed to creating extraordinary experiences
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Our Mission</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To inspire and enable authentic travel experiences that connect people with diverse cultures, breathtaking landscapes, and meaningful adventures while promoting sustainable and responsible tourism practices.
                </p>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Our Vision</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To become the world's most trusted travel companion, creating a global community of conscious explorers who celebrate diversity, protect our planet, and inspire others to discover the transformative power of travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide every adventure and shape every experience we create
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-teal-600 group-hover:to-cyan-600 transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-32">
          <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-20 rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-teal-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-400 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Impact in Numbers
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Every number tells a story of adventure, discovery, and human connection
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="group transform hover:scale-110 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <p className="text-lg text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Meet Our Adventure Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Passionate explorers and travel experts dedicated to crafting your perfect adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-semibold mb-3 text-lg">
                    {member.role}
                  </p>
                  <p className="text-slate-600">
                    {member.expertise}
                  </p>
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
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-cyan-100 leading-relaxed">
                Join thousands of travelers who have discovered extraordinary experiences with Travel8848
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-teal-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg"
                >
                  Plan Your Journey →
                </Link>
                <Link
                  to="/blog"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-semibold px-8 py-4 rounded-full transition-all text-lg"
                >
                  Explore Stories
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;

