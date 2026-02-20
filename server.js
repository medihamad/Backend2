const express = require('express');

const app = express();

//routes

app.get('/', (req, res)=>{
    res.send('welcome to express server');
})

app.get('/user', (req, res)=>{
    res.send('user route');
})

app.listen(3000, ()=>{
    console.log('listenning on port ', 3000);
})

