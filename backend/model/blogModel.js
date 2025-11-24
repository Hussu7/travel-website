const mongoose=require("mongoose")
const Schema=mongoose.Schema

const blogSchema=new Schema({
    title:{
        type: String,
        required: true
    },
    subTitle:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    category:{
        type: String,
        enum: ['adventure', 'culture', 'food', 'tips', 'photography', 'general'],
        default: 'general'
    },
    author:{
        type: String,
        default: "Travel8848 Team"
    },
    readTime:{
        type: String,
        default: "5 min read"
    },
    tags:{
        type: [String],
        default: []
    },
    featured:{
        type: Boolean,
        default: false
    }
}, {
    timestamps:true
})

const Blog= mongoose.model("Blog", blogSchema)
module.exports=Blog