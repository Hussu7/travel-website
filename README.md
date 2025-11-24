# Travel Website - Travel8848

A full-stack MERN (MongoDB, Express, React, Node.js) travel blog application with rich text editing, image management, and engagement features.

## Features

### Frontend
- 🎨 Modern, responsive UI with Tailwind CSS
- 📝 Rich text editor with formatting options (bold, italic, underline, font sizes, colors)
- 🖼️ Image upload and inline image insertion
- ❤️ Blog engagement features (likes, comments, shares, bookmarks)
- 📊 Reading progress indicator
- 🔍 Blog search and category filtering
- 📱 Mobile-responsive design
- ✨ Hero slider on homepage
- 📰 Featured articles section

### Backend
- 🗄️ MongoDB database with Mongoose ODM
- 🔧 RESTful API with Express.js
- 📦 CRUD operations for blogs
- 🎯 Blog categories and tagging system
- 👤 Author and metadata management

### Dashboard
- ✏️ Create and edit blogs with rich text editor
- 🎨 Text formatting toolbar (font size, alignment, colors, etc.)
- 🖼️ Header image upload
- 📷 Inline image insertion in content
- 📋 Blog management interface
- 🗑️ Delete blogs functionality

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/travel-website.git
cd travel-website
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure MongoDB:
- Update the MongoDB connection string in `backend/database/database.js`

5. Start the backend server:
```bash
cd backend
node app.js
```
The backend will run on http://localhost:2000

6. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

## Project Structure

```
travel-website/
├── backend/
│   ├── app.js                 # Express server
│   ├── database/
│   │   └── database.js        # MongoDB connection
│   ├── model/
│   │   └── blogModel.js       # Blog schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── Dashboard/         # Admin dashboard
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /blogs` - Get all blogs
- `GET /blog/:id` - Get single blog by ID
- `POST /blog` - Create new blog
- `PATCH /blog/:id` - Update blog
- `DELETE /blog/:id` - Delete blog

## Features in Detail

### Rich Text Editor
- Font size selection (10px - 48px)
- Text formatting (Bold, Italic, Underline, Strikethrough)
- Text alignment (Left, Center, Right, Justify)
- Lists (Ordered, Unordered)
- Headings (H1, H2, H3)
- Text and background colors
- Image insertion with URL

### Blog Engagement
- Like/Unlike blogs
- Comment system with nested replies
- Share functionality
- Bookmark/Save for later
- Live engagement statistics

### Reading Experience
- Reading progress bar
- Estimated read time
- Author information display
- Related blog suggestions
- Responsive image gallery

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
