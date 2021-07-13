
const express =require('express');
const http= require('http');
const path =require('path');
const bodyParser = require('body-parser');
const db = require('./database');

const app =express();

app.set('view engine','ejs');
app.set('views','./views');

// app.use(bodyParser.urlencoded({extended:true}));

// const staticpath = path.join(__dirname ,"public");
// app.use(express.static(staticpath));

app.get('/',(req,res)=>
{
    db.query('SELECT * FROM products',(err,rows,fields)=>
    {
        if(!err)
        {
            // res.send(rows)
            res.render('index',{title:"Products",products:rows});        
        }     
        else 
            throw err;
    })
})

app.listen(3000,()=>{console.log("Server Running")});

