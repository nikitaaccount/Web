const express =require('express');
const app =express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static',express.static('public'));
app.set('view engine','ejs');
app.set('views','./public/views');

app.get('/',(req,res)=>
{
    res.render('index',{title:"Registration Form",message:"Enter UserName and Password "});
})
app.post('/',(req,res)=>
{
    res.render('login',{title: "Your Details",user:req.body.user,pass:req.body.pass});
})

app.listen(8000,()=>{console.log("Server running on port 8000")});