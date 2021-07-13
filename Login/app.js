
const express =require('express');
const path =require('path');
const http =require('http');
const bodyParser = require('body-parser');
const db = require('./database');

const app =express();
const encoder=bodyParser.urlencoded({extended:true});

const staticpath = path.join(__dirname ,"public");
app.use(express.static(staticpath));

app.get('/',(req,res)=>
{
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/',encoder,(req,res)=>
{
    db.query('SELECT * FROM login WHERE username=? and password=?',[req.body.username,req.body.password],(err,rows,fields)=>
    {
        if(rows.length> 0 )
        {
            res.redirect("/welcome"); 
        }     
        else 
            res.redirect("/"); 
    })
});

//when login is successful
app.get('/welcome',(req,res)=>
{
    res.sendFile(__dirname + "/welcome.html");
});

app.listen(3000,()=>{console.log("Server Running")});

