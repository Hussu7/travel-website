import { useState, useEffect } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    travelType: "general"
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "", travelType: "general" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: "✈️",
      title: "Plan Your Trip",
      details: "info@travel8848.com",
      description: "Get personalized travel advice",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: "🌍",
      title: "Global Support",
      details: "Available 24/7",
      description: "We're here wherever you are",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: "🏔️",
      title: "Kathmandu Office",
      details: "Thamel, Kathmandu, Nepal",
      description: "Visit our mountain headquarters",
      gradient: "from-green-500 to-teal-500"
    },
  ];

  const travelTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "adventure", label: "Adventure Travel" },
    { value: "cultural", label: "Cultural Tours" },
    { value: "trekking", label: "Trekking & Hiking" },
    { value: "photography", label: "Photography Tours" },
    { value: "group", label: "Group Travel" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Mountain contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center text-white max-w-4xl px-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
            Let's Plan Your Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-200 leading-relaxed">
            Ready to explore the world? We're here to make your travel dreams come true
          </p>
          <div className="flex items-center justify-center gap-6 text-cyan-200">
            <span className="flex items-center gap-2">
              <span className="text-2xl">🌟</span> Expert Guidance
            </span>
            <span className="flex items-center gap-2">
              <span className="text-2xl">⚡</span> Quick Response
            </span>
            <span className="flex items-center gap-2">
              <span className="text-2xl">🎯</span> Personalized Plans
            </span>
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
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 text-center"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl text-white">{info.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-teal-600 group-hover:to-cyan-600 transition-all duration-300">
                  {info.title}
                </h3>
                <p className="text-teal-600 font-semibold mb-3 text-lg">{info.details}</p>
                <p className="text-slate-600 leading-relaxed">{info.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Info */}
          <div className="lg:sticky lg:top-8">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Get in Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Start Your Journey Today
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Ready to explore breathtaking destinations? Our travel experts are here to craft your perfect adventure. Share your travel dreams with us!
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Expert Travel Consultation</h4>
                  <p className="text-slate-600">Get personalized advice from experienced travel professionals</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Quick Response Time</h4>
                  <p className="text-slate-600">We'll get back to you within 24 hours with detailed information</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-500 to-teal-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">🛡️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Safe & Secure</h4>
                  <p className="text-slate-600">Your information is protected and handled with complete confidentiality</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Customized Itineraries</h4>
                  <p className="text-slate-600">Tailored travel plans designed specifically for your preferences</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">2000+</div>
                <div className="text-sm text-slate-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">50+</div>
                <div className="text-sm text-slate-600">Destinations</div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white/70 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl border border-white/20">
            {submitted && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <div className="font-semibold text-lg">Message Sent Successfully!</div>
                    <div className="text-green-100">We'll get back to you within 24 hours with your personalized travel plan.</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Tell Us About Your Dream Trip</h3>
              <p className="text-slate-600">Fill in the details below and we'll create a customized adventure just for you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 font-semibold text-slate-800" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 bg-white/80 border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-800 placeholder-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-3 font-semibold text-slate-800" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-4 bg-white/80 border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-800 placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 font-semibold text-slate-800" htmlFor="travelType">
                  Travel Interest
                </label>
                <select
                  name="travelType"
                  id="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/80 border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-800"
                >
                  {travelTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-3 font-semibold text-slate-800" htmlFor="subject">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you plan?"
                  className="w-full px-4 py-4 bg-white/80 border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-800 placeholder-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-3 font-semibold text-slate-800" htmlFor="message">
                  Tell us about your travel dreams *
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your ideal trip: destinations, activities, budget, travel dates, group size, or any special requirements..."
                  className="w-full px-4 py-4 bg-white/80 border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all text-slate-800 placeholder-slate-400 resize-none"
                  rows="6"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 text-lg"
              >
                <span>Start Planning My Adventure</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Contact;
