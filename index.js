const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()// gives app objects
const socketio = require('socket.io');
const http = require('http')
const port = process.env.PORT || 4002
const cors = require('cors')
app.use(express.json())

const path = require('path') 

const server = http.createServer(app)

setupDB()
app.use(cors()) 
app.use('/', router )// middleware use function
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

const io = socketio(server)
const requestsController = require('./app/controllers/requestsController')
// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!"+ socket.id);
  // Receiving Requests from client
  
  socket.on('addRequest', (request) => {
    console.log('socketData: '+JSON.stringify(request));
    requestsController.addRequest(io,request);
  });

  //Receiving Updated Requests approved and rejected from client
  socket.on('approveRequest', (request) => {
    console.log('socketData: '+JSON.stringify(request));
    requestsController.approveRequest(io,request);
  });
  socket.on('rejectRequest', (request) => {
    console.log('socketData: '+JSON.stringify(request));
    requestsController.rejectRequest(io,request);
  });
  
})


server.listen(port, () => console.log(`Listening on port ${port}`));