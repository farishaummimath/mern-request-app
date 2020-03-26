const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    message : {
        type : String,
        required : true
    },
    assignee : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    department:{
        type: Schema.Types.ObjectId,
        ref : 'Department'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        default : 'Pending'
    },
    createdAt : {
        type : Date,
        default: new Date()
    }
})

const Request = mongoose.model('Request',requestSchema)

module.exports = Request