const mongoose = require('mongoose')
const faker = require('faker')

const Department = require('../app/models/department')
const User = require('../app/models/user')
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app'
mongoose.connect(CONNECTION_URI)
    .then(()=>{
        console.log('connected to db')
        const departments = ['HR','IT']
        departments.forEach(function(department){
            const dep = new Department({name:department})
            dep.save()
                .then((dep)=>{
                    for(i=0;i<3;i++){
                           const user = new User({
                           name: faker.name.firstName(),
                           department:dep._id,
                           email: faker.internet.email(),
                           password: 'secret@123'
                           
                       })
                       console.log(i,user.name,' before save')
                       user.save()
                            .then(()=>{
                                console.log(user.name,' Saved')
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                    }
                })
        })
       
    })
    .catch((err)=>{
        console.log(err)

    })