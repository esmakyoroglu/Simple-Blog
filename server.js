import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;
const API_URL="http://localhost:4000";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

//API_URL localhost:4000'den kolaylıkla veriler çekebiliriz bu veri çekmeyi de axios ile gerçekleştirdik

app.get("/", async(req, res)=>{
    try {
        const response=await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("main", { posts:response.data });
    } catch (error) {
        res.status(500).json({message:"Yazılar alınırken hata oluştu"})
    }
});

app.get("/new", (req, res)=>{
    res.render("modify", { header:"Yeni Yazı", submit:"Yazıyı Oluştur" });
});

app.get("/edit/:id", async(req, res)=>{
    try {
        const response= await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("modify", { header:"Yazıyı Düzenle", submit:"Yazıyı Düzenle", post:response.data });
    } catch (error) {
        res.status(500).json({message:"Yazılar alınırken hata oluştu"});
    }
});
//yeni yazı oluşturma
app.post("/api/posts", async(req, res)=>{
    try {
        const response= await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message:"Yazı oluşturulurken hata oluştu"});
    }
});
//yazı güncelleme, (patch)
app.patch("/api/posts/:id", async(req, res)=>{
    try {
        const response= await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message:"Yazıyı güncellerken bir hata oluştu"});
    }
});
//yazıyı silme
app.get("/api/post/delete/:id", async(req, res)=>{
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message:"Yazıyı silerken bir hata oluştu"});
    }
});

app.listen(port, (req, params)=>{
    console.log(`${port}'da çalışmkatadır`);
});