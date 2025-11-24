import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";

function EditBlog() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    image: '',
    category: 'general',
    author: 'Travel8848 Team',
    readTime: '5 min read',
    tags: [],
    featured: false,
    status: 'draft'
  });
  const [originalData, setOriginalData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Check for changes
    const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(changed);
  }, [formData, originalData]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/blogs/${id}`);
      if (response.data.status === 200) {
        const blogData = response.data.data;
        setFormData(blogData);
        setOriginalData(blogData);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (status = formData.status) => {
    if (!formData.title || !formData.subTitle || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSaving(true);
      const dataToSave = { ...formData, status };
      
      let response;
      if (id) {
        response = await axios.patch(`${API_URL}/blogs/${id}`, dataToSave);
      } else {
        response = await axios.post(`${API_URL}/blogs`, dataToSave);
      }

      if (response.status === 200 || response.status === 201) {
        setOriginalData(dataToSave);
        if (!id) {
          navigate(`/admin/dashboard/edit/${response.data.data._id}`);
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = () => {
    handleSave('published');
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {id ? 'Edit Blog Post' : 'New Blog Post'}
                </h1>
                {hasChanges && (
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    • Unsaved changes
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  preview
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {preview ? '📝 Edit' : '👁️ Preview'}
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={saving || !hasChanges}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={handlePublish}
                disabled={saving}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {saving ? 'Publishing...' : (formData.status === 'published' ? 'Update' : 'Publish')}
              </button>

              {id && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {preview ? (
          // Preview Mode
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  formData.status === 'published'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {formData.status === 'published' ? '✅ Published' : '📄 Draft'}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {formData.title || 'Your Blog Title'}
              </h1>
              
              <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-8">
                {formData.subTitle || 'Your blog subtitle'}
              </p>
              
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {formData.description || 'Your blog content will appear here...'}
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="space-y-6">
              {/* Status Indicator */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`px-3 py-1 rounded-lg border font-medium text-sm ${
                    formData.status === 'published'
                      ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400'
                      : 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400'
                  }`}
                >
                  <option value="draft">📄 Draft</option>
                  <option value="published">✅ Published</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter an engaging blog title..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subTitle"
                  placeholder="A catchy subtitle that complements your title..."
                  value={formData.subTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Category, Author, Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white"
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
                    placeholder="Author name"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Featured Checkbox */}
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
                  ⭐ Mark as featured blog
                </label>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blog Content
                </label>
                <textarea
                  name="description"
                  placeholder="Write your blog content here. Share your travel experiences, tips, and stories..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none leading-relaxed"
                  rows="20"
                />
              </div>

              {/* Writing Tips */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-400 mb-2">
                  ✍️ Writing Tips for Travel Blogs
                </h3>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <li>• Start with a compelling hook to grab readers' attention</li>
                  <li>• Include specific details about locations, experiences, and tips</li>
                  <li>• Use descriptive language to help readers visualize the destination</li>
                  <li>• Add practical information like costs, best times to visit, and recommendations</li>
                  <li>• End with a call-to-action or question to encourage engagement</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auto-save indicator */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-400 px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Unsaved changes</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBlog;