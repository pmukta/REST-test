const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');



app.use(express.urlencoded({ extended : true}));
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')


const port=3000;

let employees = [
    {
        id:uuid(),
        employeeName: 'Himagiri',
        employeeId: 123456
    },
    {
        id:uuid(),
        employeeName: 'Vasantha',
        employeeId: 456789
    },
    {
        id: uuid(),
        employeeName: 'Vijaya',
        employeeId: 741852
    }
]

app.get('/employees', (req,res)=>{
    res.render('index', {employees})
})

app.get('/employees/new', (req,res)=>{
    res.render('new')
})

app.post('/employees',(req,res)=>{
    const {employeeName, employeeId} = req.body;
    employees.push({employeeName, employeeId, id: uuid()})
    res.redirect('/employees')
})

app.get('/employees/:id',(req,res)=>{
    const {id} = req.params;
    const employee = employees.find(e => e.id === id)
    res.render('show', {employee})
})

app.get('/employees/:id/edit', (req, res)=>{
    const {id} = req.params;
    const employee = employees.find(e => e.id === id)
    res.render('edit', {employee})
})

app.patch('/employees/:id', (req,res)=>{
    const {id} = req.params;
    const newEmployeeName = req.body.employeeName;
    const foundEmployee = employees.find(e => e.id === id)
    foundEmployee.employeeName = newEmployeeName;
    res.redirect('/employees')
})

app.delete('/employees/:id', (req,res)=>{
    const {id} = req.params;
    employees = employees.filter(e => e.id !== id);
    res.redirect('/employees')
})


app.listen(port,()=>{
    console.log('Listening on port '+ port+ '!');
})