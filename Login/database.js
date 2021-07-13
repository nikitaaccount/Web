const mysql =require('mysql');

const connection =mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'nodelogin'
 });

 connection.connect((err)=>
 {
    if(err) throw err;
    console.log("Connected to a database ");
 });
 
 module.exports =connection;