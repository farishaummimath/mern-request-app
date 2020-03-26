const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app'
const setupDB = ()=>{
    mongoose.connect(CONNECTION_URI,{useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch(()=>{
        console.log('Error connecting to db')
    })
}
mongoose.set('useCreateIndex', true)
module.exports = setupDB