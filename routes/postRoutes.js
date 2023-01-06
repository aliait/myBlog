const express=require("express")
const {getPosts,getPost,addPost,updatePost,editPost,deletePost }=require("../controllers/postsController")

const router=express.Router();

// les routes post
router.get("/", getPosts)
router.get("/post", addPost)
router.post("/post", addPost)
router.get("/show", getPost)
router.get("/editpost", editPost)
router.post("/editpost", updatePost)

module.exports=router