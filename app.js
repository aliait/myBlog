
//requirements
const express=require("express")
const app=express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
postRouter = require("./routes/postRoutes")

//utiliser les middleware nissecaires
app.set('view engine', 'pug');
app.use("/", postRouter);
app.use(express.static("./public"))


//Definition des routes
const port=3000;
app.listen(port, function() {
    console.log("Server is listening at port:" + port);
});

module.exports=app