const { connectDatabase } = require("./database/database");
const express = require("express");
const app = express();
const cors = require("cors");

const Blog = require("./model/blogModel");

connectDatabase();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://travel-website-frontend.vercel.app", process.env.FRONTEND_URL],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET API

//create blog api

app.post("/blogs", async (req, res) => {
  console.log(req.body);
  const { title, subTitle, description, image, category, author, readTime, tags, featured } = req.body;
  
  try {
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      image,
      category,
      author,
      readTime,
      tags,
      featured
    });
    
    res.status(201).json({
      status: 201,
      message: "Blog created successfully",
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Failed to create blog",
      error: error.message
    });
  }
});

//fetch blog api
app.get("/blogs", async (req, res) => { 
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    if (blogs.length > 0) {
      res.json({
        status: 200,
        message: "Blogs fetched successfully",
        data: blogs,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "No blogs found",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching blogs",
      error: error.message
    });
  }
});

//fetch single data by id

app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      res.status(200).json({
        status: 200,
        message: "Blog fetched successfully",
        data: blog,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 500,
      message: "Error fetching blog",
      error: error.message 
    });
  }
});
//API to delete

app.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      status: 500,
      message: "Error deleting blog",
      error: error.message,
    });
  }
});

// API  to update

app.patch("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const { title, subTitle, description, image, category, author, readTime, tags, featured } = req.body;
  
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, subTitle, description, image, category, author, readTime, tags, featured },
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found"
      });
    }
    
    res.status(200).json({
      status: 200,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ 
      status: 500,
      message: "Update failed",
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});

module.exports = app;
