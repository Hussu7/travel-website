import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";

function Dashboard() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subTitle: "",
    image: "",
    category: "general",
    author: "Travel8848 Team",
    readTime: "5 min read",
    tags: [],
    featured: false
  });
  const [submit, setSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Rich text editor functions
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
    }
  };

  const handleEditorInput = (e) => {
    setFormData({ ...formData, description: e.currentTarget.innerHTML });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs`);
        if (response.data.status === 200) {
          setBlogs(response.data.data);
          return;
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    if (!submit) return;
    const creatBlogs = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/blogs`,
          formData
        );
        console.log(response);
        if (response.status === 201) {
          showSuccess("Blog added successfully!");
          setFormData({ 
            title: "", 
            description: "", 
            subTitle: "",
            image: "",
            category: "general",
            author: "Travel8848 Team",
            readTime: "5 min read",
            tags: [],
            featured: false
          });
          setSubmit(false);
          // Refresh blogs list
          const blogsResponse = await axios.get(`${API_URL}/blogs`);
          if (blogsResponse.data.status === 200) {
            setBlogs(blogsResponse.data.data);
          }
          return;
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setSubmit(false);
      }
    };
    creatBlogs();
    
  }, [submit]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subTitle || !formData.description) {
      alert("Please fill in all fields");
      return;
    }
    setSubmit(true);
    console.log("Form submitted", formData);
  };
  // Show success message
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Add new blog

  // Delete blog
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    (async () => {
      try {
        await axios.delete(`${API_URL}/blogs/${id}`);
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        showSuccess("Blog deleted successfully!");
      } catch (err) {
        console.error(err);
        showSuccess("Failed to delete blog");
      }
    })();
  };

  // Start editing blog
  const handleEdit = (blog) => {
    // navigate to the edit page for this blog
    navigate(`/dashboard/edit/${blog._id}`);
  };

  // Update blog
  const handleUpdate = () => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === editingId ? { ...blog, ...formData } : blog
      )
    );
    setEditingId(null);
    setFormData({ title: "", description: "", subTitle: "" });
    showSuccess("Blog updated successfully!");
  };

  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Clean Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome to Travel8848 content management
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Clean Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Blogs</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">{blogs.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 text-xl">📝</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">{publishedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-xl">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">{draftCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-xl">📄</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                  {blogs.filter(blog => new Date(blog.createdAt).getMonth() === new Date().getMonth()).length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Create New Blog Post
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Share your travel stories with the world
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter blog title..."
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subTitle"
                placeholder="Enter subtitle..."
                value={formData.subTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white"
                >
                  <option value="general">General</option>
                  <option value="adventure">Adventure</option>
                  <option value="culture">Culture</option>
                  <option value="food">Food & Drink</option>
                  <option value="tips">Travel Tips</option>
                  <option value="photography">Photography</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Author name..."
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  name="readTime"
                  placeholder="5 min read"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              
              {/* Rich Text Editor Toolbar */}
              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-t-lg p-2 flex flex-wrap gap-1">
                {/* Font Size */}
                <select
                  onChange={(e) => applyFormat('fontSize', e.target.value)}
                  className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300"
                  defaultValue="3"
                >
                  <option value="1">Small</option>
                  <option value="3">Normal</option>
                  <option value="5">Large</option>
                  <option value="7">Huge</option>
                </select>

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Text Formatting */}
                <button
                  type="button"
                  onClick={() => applyFormat('bold')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors"
                  title="Bold (Ctrl+B)"
                >
                  <span className="font-bold text-gray-700 dark:text-gray-300">B</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('italic')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors"
                  title="Italic (Ctrl+I)"
                >
                  <span className="italic text-gray-700 dark:text-gray-300">I</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('underline')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors"
                  title="Underline (Ctrl+U)"
                >
                  <span className="underline text-gray-700 dark:text-gray-300">U</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('strikeThrough')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors"
                  title="Strikethrough"
                >
                  <span className="line-through text-gray-700 dark:text-gray-300">S</span>
                </button>

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Alignment */}
                <button
                  type="button"
                  onClick={() => applyFormat('justifyLeft')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors text-gray-700 dark:text-gray-300"
                  title="Align Left"
                >
                  ≡
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('justifyCenter')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors text-gray-700 dark:text-gray-300"
                  title="Align Center"
                >
                  ≣
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('justifyRight')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors text-gray-700 dark:text-gray-300"
                  title="Align Right"
                >
                  ≡
                </button>

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Lists */}
                <button
                  type="button"
                  onClick={() => applyFormat('insertUnorderedList')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors text-gray-700 dark:text-gray-300"
                  title="Bullet List"
                >
                  ☰
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('insertOrderedList')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors text-gray-700 dark:text-gray-300"
                  title="Numbered List"
                >
                  ≣
                </button>

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Heading */}
                <select
                  onChange={(e) => applyFormat('formatBlock', e.target.value)}
                  className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300"
                  defaultValue="p"
                >
                  <option value="p">Paragraph</option>
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="h4">Heading 4</option>
                </select>

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Image Insert */}
                <button
                  type="button"
                  onClick={insertImage}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 border border-gray-300 dark:border-gray-600 rounded transition-colors text-green-600 dark:text-green-400 font-semibold"
                  title="Insert Image"
                >
                  🖼️ Image
                </button>

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Text Color */}
                <input
                  type="color"
                  onChange={(e) => applyFormat('foreColor', e.target.value)}
                  className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                  title="Text Color"
                />
                <input
                  type="color"
                  onChange={(e) => applyFormat('backColor', e.target.value)}
                  className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                  title="Background Color"
                />

                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                {/* Clear Formatting */}
                <button
                  type="button"
                  onClick={() => applyFormat('removeFormat')}
                  className="px-3 py-1 bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 border border-gray-300 dark:border-gray-600 rounded transition-colors text-red-600 dark:text-red-400"
                  title="Clear Formatting"
                >
                  ✕
                </button>
              </div>

              {/* Rich Text Editor */}
              <div
                contentEditable
                onInput={handleEditorInput}
                className="w-full min-h-[300px] px-4 py-3 bg-white dark:bg-gray-700 border border-t-0 border-gray-300 dark:border-gray-600 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 text-gray-900 dark:text-white overflow-auto"
                style={{ maxHeight: '500px' }}
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: formData.description }}
              ></div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Use the toolbar above to format your content. You can change font sizes, make text bold, italic, underlined, change colors, and more.
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Mark as featured blog
              </label>
            </div>
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={submit}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{submit ? "Publishing..." : "Publish Blog"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Blog Posts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your published content
            </p>
          </div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  {blog.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 mr-3">
                        {blog.title}
                      </h3>
                      <div className="flex flex-col gap-1">
                        {blog.featured && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                            ⭐ FEATURED
                          </span>
                        )}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          blog.category === 'adventure' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400' :
                          blog.category === 'culture' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400' :
                          blog.category === 'food' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                        }`}>
                          {blog.category?.toUpperCase() || 'GENERAL'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2 line-clamp-1">
                      {blog.subTitle}
                    </p>
                    <div 
                      className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3"
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    />
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>👤 {blog.author || 'Travel8848 Team'}</span>
                      <span>•</span>
                      <span>📖 {blog.readTime || '5 min read'}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/dashboard/edit/${blog._id}`)
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">📝</span>
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No blog posts yet
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Create your first blog post to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
