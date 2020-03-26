const Request = require('../models/request')

module.exports.list = (req,res) => {
    Request.find().sort({'createdAt': -1})
    .then((notes)=>{
        res.json(notes)
    })
    .catch((err) => {
        res.json(err)
    })
}


module.exports.create = (req,res) => {

    const body  = req.body
    const request = new Request(body)
    request.createdBy = req.user._id 
    console.log("inside contrss",request)

    request.save()
    .then((request)=>{
        console.log(request)
        res.json(request)
    })
    .catch((err)=>{
        res.json(err)
    })

}

module.exports.reqOp = (req,res)=>{
    const id = req.params.id
    const body = req.body
    console.log('bodddy',req.user)
    console.log("Edited--",body)

   Request.findOneAndUpdate({_id:id,assignee:req.user._id}, body,{new : true,useFindAndModify:false, runValidators: true})
     .then((request)=>{
         console.log(request)
         if(request) {
             res.json(request)
         } else {
             res.json({})
         }

     })
     .catch((err)=>{
         res.json(err)

     })

}
module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body

   Request.findOneAndUpdate({_id:id,createdBy:req.user._id}, body,{new : true, runValidators: true})
     .then((request)=>{
         console.log(request)
         if(request) {
             res.json(request)
         } else {
             res.json({})
         }

     })
     .catch((err)=>{
         res.json(err)

     })

}