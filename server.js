const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db_con = require('./src/modules/db_con.js');
const cookieParser = require('cookie-parser');
const { render } = require('ejs');
const port = require('./src/modules/EnvConfig.js').start();


//middlewares
app.use(bodyParser.json({type:'application/json'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public',express.static(path.join(__dirname,"public")));
app.use(cookieParser());
//renders init
app.set('view engine','ejs');
//routes
app.get(`/food/:food`, function (req,res) {
    let menuData = fs.readFileSync('src/data/menu.json');
    let menu = JSON.parse(menuData);
    let response =  req.params.food != 'all' ? menu[req.params.food] : menu;
    res.send(response);
  })

app.get("/",(req,res) => {
    
    res.render('index');
})
app.get("/login",(req,res)=>{
    
    res.render('login',{errMsg: false});
});
app.post("/login",(req,res)=>{
    db_con.login(req,res);
});
app.get("/disconnect",(req,res)=>{
    res.clearCookie("username");
    res.redirect('/');
});
app.get("/register",(req,res)=>{
    res.render('register');
});
app.post("/register",(req,res)=>{
    let {mail,username,password} = req.body;
    db_con.add(username,password,mail);
    res.render('index');
});


app.listen(port);