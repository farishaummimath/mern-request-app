const User = require('../models/user')
const _ = require('lodash')

module.exports.list = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
}
module.exports.login = (req,res)=>{
    const body = req.body
    // own static method
    let user
    User.findByCredentials(body.email,body.password)
        .then(userFound=>{
            // create own instance method
            // generate token and write to db. it is async op so return promise
            console.log(userFound)

            user = userFound
            return user.generateToken()
            // res.send(user)
        })
        .then(token=>{
            //res.send(token)// token not in body
            // instead send in header- new prop and value
            //once user su
            console.log('tok',token,user)
            user = {_id:user._id, name: user.name, email: user.email,department:user.department}
            res.json({
                token,
                user
            })
            //res.setHeader('x-auth',token).json({})
        })
        .catch(function(err){
            res.send(err)
        })

}
module.exports.account = (req,res)=>{
    const { user } = req
    res.send(_.pick(user,['id','name','email','department']))

}
module.exports.logout=(req,res)=>{
    const {user,token} = req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}
