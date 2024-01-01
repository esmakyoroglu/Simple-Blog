import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));


let posts=[
    {
        id:1,
        title:"Basit Blog Sayfası Örneği",
        content:"Express, node.js, json, ejs kullanılarak oluşturulmuştur",
        author:"Esma Köroğlu",
        date:"30.12.2023",
    }
];

let lastId=1;

app.get("/posts", (req, res)=>{
    console.log(posts);
    res.json(posts);
});
//belirli bir yazıyı almak, seçmek için
app.get("/posts/:id", (req, res)=>{
    const post=posts.find((p)=> p.id === parseInt(req.params.id));
    if(!post) return res.status(404).json({message:"yazı bulunamadı"});
    res.json(post);
});
//yeni bir yazı oluşturmak için
app.post("/posts", (req, res)=>{
    const newId=lastId+=1;
    const post={
        id:newId,
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        date:new Date(Date.now()).toLocaleString(),
    };
    lastId=newId;
    posts.push(post);
    res.status(201).json(post);
});
//yazıyı güncelleme
app.patch("/posts/:id", (req, res)=>{
    const post=posts.find((p)=> p.id === parseInt(req.params.id));
    if(!post) return res.status(404).json({message:"Yazı bulunamadı"});

    if(req.body.title) post.title=req.body.title;
    if(req.body.content) post.content= req.body.content;
    if(req.body.author) post.author=req.body.author;

    res.json(post);
});
//belirli bir yazıyı silme
app.delete("/posts/:id", (req, res)=>{
    const index=posts.findIndex((p)=> p.id === parseInt(req.params.id));
    if(index=== -1) return res.status(404).json({message:"Yazı bulunamdı"});
    //1 tane yazı kaldırılacaktır
    posts.splice(index, 1);
    res.json({message:"Yazı silinmiştir"});
});

app.listen(port, (req, res)=>{
    console.log(`${port}'da çalışmaktadır.`);
});