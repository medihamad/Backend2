const express = require('express');
const { v4 : uuidv4 } = require('uuid');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

//middlewares => functions that run between req and response, it can block req, read req

app.use(express.json());

const logger = (req, res, next)=>{
    console.log(req.method, req.url);
    next();
}

app.use(logger)


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

// STUDENT API CREATION STARTS HERE

let students = [
    {
        id: uuidv4(), 
        name: 'John',
        age: 22
    },
    {
        id: uuidv4(), 
        name: 'Medi',
        age: 36
    }
]

//GET /students

app.get('/students', (req, res)=>{
    res.status(200).json(students);
})

//POST /students

app.post('/students', (req, res)=>{
    const {name, age} = req.body;

    if(!name || !age) return res.status(400).json({
        message: "Name and age are required"
    })

    const newStudent = {
        id: uuidv4(),
        name, 
        age
    }

    students.push(newStudent);

    res.status(201).json({
        success: true,
        data: newStudent
    })

})


//GET /students/:id

app.get('/students/:id',(req, res)=>{
    const id = req.params.id;

    const student = students.find(st=> st.id === id);

    if(!student) return res.status(404).json({message: "student not found"});

    res.status(200).json(student)
    
})

//PUT /students/:id

app.patch('/students/:id', (req, res)=>{
    const id = req.params.id;
    const {name, age} = req.body

    const student = students.find(st=> st.id === id);

    if(!student) return res.status(404).json({message: "student not found"});

    if(name) student.name = name
    if(age) student.age = age

    res.status(200).json(students);


})

//DELETE /students/:id

app.delete('/students/:id', (req, res)=>{
    const id = req.params.id;

    const index = students.findIndex(st => st.id === id);

    if(index === -1) return res.status(404).json({message: "student not found"});

    
    const deletedStudent = students.splice(index, 1)

    console.log()

    res.status(200).json({message: "student deleted", data: deletedStudent});
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

