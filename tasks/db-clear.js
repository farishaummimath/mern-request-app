const mongoose = require('mongoose')
const Department = require('../app/models/department')
const User = require('../app/models/user')

mongoose.connect('mongodb://localhost:27017/mern-app')
    .then(()=>{
        console.log('connected to db for clear')
        Department.deleteMany({})
            .then(()=>{
                console.log('Department documents removed')
            })
            .catch(err=> console.log(err))
        User.deleteMany({})
            .then(()=>{
                console.log('User documents removed')
            })
            .catch(err=> console.log(err))
       
    })
    .catch((err)=>{
        console.log(err)

    })