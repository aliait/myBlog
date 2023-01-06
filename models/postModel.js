const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")
var query = "mongodb://127.0.0.1:27017/myblog"

const db = query;

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
    else{
        console.log("connected");
    }
});

// definition d'un schèma
const postSchema = mongoose.Schema({
    titre: {
        // chaine de caractère unique non nulle
        type: String,
        required: true,
    },
    auteur: {
        // chaine de caractère avec la valeur "unkown" par defaut
        type: String,
        default: "unkown",
    },
    resume: {
        // chaine de caractère non nulle de moins de 100 caractères
        type: String,
        maxlength: 99,
        required: true,
    },

    content: {
        // chaine de caractère non nulle, au moins de 100 caractères
        type: String,
        minlength: 99,
        required: true,
    }
}, { timestamps: true })

//créer et exporter un Modéle Post
module.exports = mongoose.model("post", postSchema, "posts");