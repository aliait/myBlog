const pug = require('pug');
const Post = require("../models/postModel")

function getPosts(req, res) {
    //Recupérer tous les posts dans myBlogdb et envoyer index.pug au client

    Post.find().then(posts => {
        // console.log(posts);
        res.render("index", { posts });
    });
}

async function getPost(req, res) {
    //Recupérer un post definie par son _id dans myBlogdb et envoyer post.pug au client

    Post.findById(req.query.id).then(post => {
        console.log(post);
        res.render("post", { post });
    });
}

async function addPost(req, res) {
    //Créer un nouveau post dans myBlogdb et rediriger le client vers /
    
    if (req.method == 'POST') {
        const post = new Post({
            titre: req.body.Titre,
            auteur: req.body.Auteur,
            resume: req.body.resume,
            content: req.body.contenu,
        });

        // Save the new post in the database
        post.save(post).then(result => {
            res.writeHead(301, {
                Location: `/`
            }).end()
        })
        return;
    }
    res.render("post")
}

async function editPost(req, res) {
    //Recupérer un post definie par son _id et renvoyer au client editPost.pug avec les donnée de ce post

    Post.findById(req.query.id).then(post => {
        console.log(post);
        res.render("editPost", { post });
    });
}
async function updatePost(req, res) {
    //metre à jour un post et rediriger le client vers ce post

    Post.findByIdAndUpdate(req.query.id, req.body, { useFindAndModify: false }).then(oldPost => {
        console.log("update result: " + oldPost);
        res.writeHead(301, {
            Location: `/show?id=${oldPost._id}`
        }).end()
    })
}

async function deletePost(req, res) {
    //Suprimer un post et rediriger le client vers /
    const id = req.params.id;

    Posts.findByIdAndDelete(id).then(data => {
        if(!data){
            res.status(404).send({message : 'ne peut pas etre suprrimé ${id}'})
        }else{
            res.send({
                message:"user was delete successfully"
            })
        }
    })
}    

module.exports = { getPosts, getPost, addPost, updatePost, editPost, deletePost }