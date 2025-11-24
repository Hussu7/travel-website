import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  // Add smooth page transition effect and scroll to top
  const handleNavigation = () => {
    // Scroll to top immediately when navigating
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Add a subtle loading effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.95';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 150);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state
      setIsScrolled(currentScrollY > 50);
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Blog", path: "/blog" },
    { name: "Travel Tips", path: "/tips" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? "backdrop-blur-md bg-white/80 shadow-lg shadow-black/5 py-2 text-gray-900" 
        : "bg-transparent text-white py-2"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center w-full">
          {/* Logo - left */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="group relative transition-all duration-500"
              onClick={handleNavigation}
            >
              {/* Logo Image */}
              <div className={`relative transition-all duration-500 ${
                isScrolled ? "w-16 h-16" : "w-16 h-16"
              }`}>
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isActive("/") ? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-400/30" : ""
                }`}></div>
                <img 
                  src="/logo.png" 
                  alt="Travel8848 Logo" 
                  className="w-full h-full object-contain group-hover:scale-125 transition-transform duration-500 brightness-110 relative z-10"
                  style={{
                    filter: 'drop-shadow(0 6px 16px rgba(20, 184, 166, 0.5)) brightness(1.1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </Link>
          </div>

          {/* Center links - perfectly centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  className={`relative px-4 py-2 mx-1 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-400/30"
                      : isScrolled 
                        ? "hover:bg-teal-500/10 hover:text-teal-600 text-gray-700 hover:shadow-md hover:shadow-teal-400/20"
                        : "hover:bg-white/20 hover:text-teal-300 text-white hover:shadow-lg hover:shadow-teal-400/30"
                  }`}
                  to={link.path}
                  onClick={handleNavigation}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-auto">

            {/* Hamburger for mobile - stays on right */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "hover:bg-teal-500/10 backdrop-blur-sm border border-gray-300 hover:border-teal-500/50 hover:shadow-md hover:shadow-teal-400/20 text-gray-700"
                    : "hover:bg-white/20 hover:shadow-lg hover:shadow-teal-400/30 text-white"
                }`}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>



          {/* Mobile dropdown menu (includes links + auth items) */}
          <div
            className={`absolute md:hidden top-full left-0 w-full backdrop-blur-md ${
              isScrolled 
                ? "bg-white/80 border-b border-gray-200" 
                : "bg-white/10 border-b border-white/20"
            } px-6 py-6 transition-all duration-500 ease-out shadow-xl shadow-black/10 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  className={`block px-6 py-3 rounded-xl transition-all duration-300 mb-2 backdrop-blur-sm border font-medium transform hover:scale-105 ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-400/30 border-teal-400/50"
                      : isScrolled
                        ? "hover:bg-teal-500/10 hover:text-teal-600 text-gray-700 border-gray-300 hover:border-teal-500/50 hover:shadow-md hover:shadow-teal-400/20"
                        : "hover:bg-white/10 hover:text-teal-300 text-slate-100 border-white/20 hover:border-teal-400/50 hover:shadow-md hover:shadow-teal-400/20"
                  }`}
                  to={link.path}
                  onClick={() => {
                    handleNavigation();
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
