const express = require('express');

const app = express();

//middlewares

app.use(express.json());

//routes path

app.get('/', (req, res)=>{
    res.send('welcome to express server');
})

app.post('/', (req, res)=>{
    console.log(req.body);
    res.send('this is a post request');
})

app.get('/user', (req, res)=>{
    res.send('user route');
    console.log(req.url, req.method)
})

app.get('/data', (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Data fetched"
    })
})

app.listen(3000, ()=>{
    console.log('listenning on port ', 3000);
})

