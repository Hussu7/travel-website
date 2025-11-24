import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const SingleBlog = () => {
  const { id } = useParams();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [shares, setShares] = useState(18);
  const [bookmarked, setBookmarked] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:2000/blogs/${id}`);
        if (res.data && res.data.data) setBlog(res.data.data);
        else setError("Blog not found");
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch related blogs based on category
  useEffect(() => {
    if (!blog) return;
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs`);
        const all = (res.data && res.data.data) || [];
        const others = all.filter((b) => b._id !== blog._id);

        // Prioritize same category blogs
        const sameCategory = others.filter(b => b.category === blog.category);
        const differentCategory = others.filter(b => b.category !== blog.category);
        
        // Take up to 3 from same category, fill remaining with others
        const final = [...sameCategory.slice(0, 3), ...differentCategory].slice(0, 3);
        setRelated(final);
      } catch (e) {
        setRelated([]);
      }
    };
    fetchRelated();
  }, [blog]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading amazing story...</p>
        </div>
      </div>
    );
    
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl text-red-500 font-semibold">{error}</p>
          <Link to="/blog" className="mt-4 inline-block text-teal-600 hover:text-teal-700 font-medium">
            ← Back to all stories
          </Link>
        </div>
      </div>
    );
    
  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-slate-600">No blog data</p>
      </div>
    );

  const getCategoryColor = (category) => {
    const colors = {
      adventure: 'from-orange-500 to-red-500',
      culture: 'from-purple-500 to-pink-500',
      food: 'from-red-500 to-orange-500',
      tips: 'from-blue-500 to-cyan-500',
      photography: 'from-indigo-500 to-purple-500',
      general: 'from-teal-500 to-cyan-500'
    };
    return colors[category] || colors.general;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      adventure: '🏔️',
      culture: '🏛️',
      food: '🍜',
      tips: '💡',
      photography: '📸',
      general: '🌍'
    };
    return icons[category] || icons.general;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${readProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blog.image || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80`}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between py-6">
          <div className="container mx-auto px-6 max-w-5xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all border border-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">All Stories</span>
            </Link>
          </div>

          <div className="container mx-auto px-6 max-w-5xl text-white pb-4">
            <div className="mb-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${getCategoryColor(blog.category)} shadow-lg`}>
                <span className="text-lg">{getCategoryIcon(blog.category)}</span>
                {blog.category || 'Travel'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-3xl">
              {blog.subTitle}
            </p>
          </div>
        </div>
      </section>

      {/* Author & Meta Info Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="container mx-auto px-6 max-w-5xl py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-md">
                {(blog.author || 'T')[0].toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{blog.author || 'Travel8848 Team'}</div>
                <div className="text-slate-500 text-xs">Author</div>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-300"></div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-300"></div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{blog.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Stats Bar */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="font-semibold text-slate-900">{likes}</span>
                <span className="text-sm">Likes</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="font-semibold text-slate-900">{comments.length}</span>
                <span className="text-sm">Comments</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="font-semibold text-slate-900">{shares}</span>
                <span className="text-sm">Shares</span>
              </div>
            </div>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg className={`w-5 h-5 ${bookmarked ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-sm font-medium text-slate-600">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-4xl py-12">
        <article className="bg-white">
          {/* Content */}
          <div>
            <div className="prose prose-lg md:prose-xl mx-auto max-w-none">
              <style>{`
                .prose {
                  color: #1e293b;
                  line-height: 1.9;
                  max-width: none;
                }
                .prose p {
                  margin-bottom: 1.5em;
                  font-size: 1.0625rem;
                  color: #475569;
                  font-weight: 400;
                  line-height: 1.85;
                }
                .prose p:first-of-type::first-letter {
                  float: left;
                  font-size: 4rem;
                  line-height: 0.9;
                  font-weight: 800;
                  margin-right: 0.12em;
                  margin-top: 0.05em;
                  color: #14b8a6;
                  font-family: Georgia, serif;
                }
                .prose strong {
                  color: #0f172a;
                  font-weight: 600;
                }
                .prose em {
                  font-style: italic;
                  color: #64748b;
                }
                .prose img {
                  border-radius: 1rem;
                  margin: 2rem auto;
                  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                  max-width: 100%;
                  height: auto;
                }
                .prose h1, .prose h2, .prose h3, .prose h4 {
                  color: #0f172a;
                  font-weight: 700;
                  margin-top: 2em;
                  margin-bottom: 1em;
                }
                .prose ul, .prose ol {
                  margin: 1.5em 0;
                  padding-left: 1.5em;
                }
                .prose li {
                  margin: 0.5em 0;
                }
              `}</style>
              
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t-2 border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 text-teal-700 rounded-lg text-sm font-semibold transition-all cursor-pointer border border-teal-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Share Article</h4>
              <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(url)}`, "_blank");
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(window.location.href);
                        const btn = event.currentTarget;
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Copied!';
                        setTimeout(() => btn.innerHTML = originalText, 2000);
                      } catch (e) {
                        alert("Could not copy link");
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full font-medium transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
            </div>

            {/* Engagement Actions */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Join the Conversation</h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setLiked(!liked);
                      setLikes(liked ? likes - 1 : likes + 1);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                      liked 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-700 hover:bg-red-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <h4 className="text-lg font-bold text-slate-900">Comments ({comments.length})</h4>
                </div>
                
                {/* Comment Input */}
                <div className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this story..."
                    rows="3"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none resize-none text-slate-700 placeholder-slate-400 transition-all"
                  ></textarea>
                  <button 
                    onClick={() => {
                      if (newComment.trim()) {
                        setComments([...comments, {
                          id: Date.now(),
                          text: newComment,
                          author: 'Anonymous',
                          date: new Date().toLocaleDateString()
                        }]);
                        setNewComment('');
                      }
                    }}
                    className="mt-3 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Post Comment
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {comments.length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                            {comment.author[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-900 text-sm">{comment.author}</span>
                              <span className="text-xs text-slate-500">{comment.date}</span>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Related Blogs */}
      {related && related.length > 0 && (
        <section className="bg-slate-50 py-24 mt-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Continue Reading
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              </div>
              <p className="text-slate-600 text-lg">
                More stories that might interest you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r._id}
                  to={`/blog/${r._id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={r.image || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${getCategoryColor(r.category)} text-white shadow-lg`}>
                        {r.category || 'Travel'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors leading-tight">
                      {r.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {r.subTitle}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                          {(r.author || 'T')[0].toUpperCase()}
                        </div>
                        <span className="font-medium">{r.author || 'Travel8848'}</span>
                      </div>
                      <span className="text-xs text-slate-400">{r.readTime || '5 min'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default SingleBlog;
