const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
//middlewares

app.use(express.json());

//routes path

app.get('/', (req, res)=>{
    res.send('welcome to express server');
})

app.post('/', (req, res)=>{
    const {username, password} = req.body;

    res.status(201).json({
        message: 'success',
        data: {username, password}
    })
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

app.listen(PORT, ()=>{
    console.log('listenning on port ', PORT);
})

