const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
    name:{
        type : String,
        required: true,

    },
    email:{
        type : String,
        required: true,
        validate : {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid Email Format'
            }
        }

    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    password: {
        type: String,

    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: new Date
            }
        }
    ]
})

userSchema.statics.findByCredentials = function(email,password){
    const User = this
    
    return User.findOne({email})
                .then(function(user){
                    if(!user) {
                        return Promise.reject('Invalid email / password')
                    }
                    return bcryptjs.compare(password,user.password)
                        .then(function(result){
                            if(result){
                                return Promise.resolve(user)
                            } else {
                                return Promise.reject('Invalid email/password')
                            }
                        })
                })
                .catch(function(err){
                    return Promise.reject(err)
                })
}
userSchema.statics.findByToken= function(token){
    const User = this // reference to User model
    // handle error from jwt verify using try and catch
    let tokenData
    try {
        tokenData = jwt.verify(token,'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
            _id: tokenData._id,
            'tokens.token':token
    }) // either user or null
}
// own instance methods

userSchema.methods.generateToken = function(){
    const user = this
    console.log('gentOk',user)
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData,'jwt@123')// secret key jwt@123
    user.tokens.push({
        token
    })
    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            Promise.reject(err)
        })
}
//pre hooks

userSchema.pre('save',function(next){
    const user = this // refers to user object, just before saving the function will be called
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
                .then(function(encryptedPassword){
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})
const User = mongoose.model('User',userSchema)
module.exports = User

