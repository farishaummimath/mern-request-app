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

module.exports.addRequest = (io,request) => {
    console.log("ss",request)
    let result;
    const reqst = new Request(request)
    reqst.save((err,req) => {
        if(err){
        result = {'success':false,'message':'Some Error','error':err};
        console.log(result);
        }
        else{
        const result = {'success':true,'message':'New Request Added Successfully',req}
        console.log('ssss',result)
        io.emit('RequestAdded', result);
        }
    })

}
module.exports.approveRequest = (io,request) => {

    console.log("app",request)
    request.status = "Approved"
    let result;
    Request.findOneAndUpdate({ _id:request._id }, request, { new:true }, (err,req) => {
        if(err){
        result = {'success':false,'message':'Some Error','error':err};
        console.log(result);
        }
        else{
        result = {'success':true,'message':`Request approved Successfully`,req};
        io.emit('RequestApproved', result);
        }
    })
}
module.exports.rejectRequest = (io,request) => {

    console.log("rej",request)
    request.status = "Rejected"

    let result;
    Request.findOneAndUpdate({ _id:request._id }, T, { new:true }, (err,req) => {
        if(err){
        result = {'success':false,'message':'Some Error','error':err};
        console.log(result);
        }
        else{
        result = {'success':true,'message':`Request approved Successfully`,req};
        io.emit('RequestRejected', result);
        }
    })
}
