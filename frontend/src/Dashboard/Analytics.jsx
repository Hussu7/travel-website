import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

function Analytics() {
  const { isDarkMode } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:2000/blogs');
      if (response.data.status === 200) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate analytics data
  const analytics = {
    totalPosts: blogs.length,
    publishedPosts: blogs.filter(b => b.status === 'published').length,
    draftPosts: blogs.filter(b => b.status === 'draft').length,
    totalViews: Math.floor(Math.random() * 10000) + 5000, // Mock data
    avgEngagement: (Math.random() * 25 + 15).toFixed(1), // Mock data
    monthlyGrowth: (Math.random() * 40 + 10).toFixed(1), // Mock data
  };

  const recentActivity = [
    { action: 'New blog post published', blog: 'Amazing Bali Adventure', time: '2 hours ago', type: 'publish' },
    { action: 'Blog post updated', blog: 'Tokyo Street Food Guide', time: '1 day ago', type: 'update' },
    { action: 'New blog post created', blog: 'Maldives Paradise', time: '2 days ago', type: 'create' },
    { action: 'Blog post deleted', blog: 'Old Travel Tips', time: '3 days ago', type: 'delete' },
  ];

  const topPerformingPosts = blogs
    .map(blog => ({
      ...blog,
      views: Math.floor(Math.random() * 1000) + 100,
      engagement: Math.floor(Math.random() * 50) + 10
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const monthlyStats = [
    { month: 'Jan', posts: 8, views: 2400 },
    { month: 'Feb', posts: 12, views: 3200 },
    { month: 'Mar', posts: 15, views: 4100 },
    { month: 'Apr', posts: 18, views: 4800 },
    { month: 'May', posts: 22, views: 5500 },
    { month: 'Jun', posts: 25, views: 6200 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-6 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your Travel8848 blog performance and engagement
          </p>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                  {analytics.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  +{analytics.monthlyGrowth}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-xl">👁️</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published Posts</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                  {analytics.publishedPosts}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {analytics.draftPosts} drafts remaining
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Engagement</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                  {analytics.avgEngagement}%
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  Above industry avg
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 text-xl">💬</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Growth</p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                  +{analytics.monthlyGrowth}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Consistent growth
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Performance Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Monthly Performance
            </h3>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={stat.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
                      {stat.month}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-1 max-w-32">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(stat.posts / 25) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.posts} posts
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.views.toLocaleString()} views
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    activity.type === 'publish' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'update' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'create' ? 'bg-orange-100 dark:bg-orange-900/30' :
                    'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <span>
                      {activity.type === 'publish' ? '✅' :
                       activity.type === 'update' ? '✏️' :
                       activity.type === 'create' ? '➕' : '🗑️'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      "{activity.blog}"
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Performing Posts
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Post Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {topPerformingPosts.map((post, index) => (
                  <tr key={post._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          #{index + 1} {post.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {post.subTitle}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {post.views?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-16 mr-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                            style={{ width: `${post.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.engagement}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {post.status || 'draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;