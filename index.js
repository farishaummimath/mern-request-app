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


// app.get('/',(req,res) => {
//     //res.send('Welcome to website')
//     // giving json response
//     res.json({
//         notice: 'welcome to website'
//     })

// })

// app.use('/', router )// middleware use function
// app.use(express.static(path.join(__dirname,"client/build"))) 
// app.get("*",(req,res) => { 
//     res.sendFile(path.join(__dirname + "/client/build/index.html")) 
// }) 
app.use('/api', router )// middleware use function
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

const io = socketio(server)

// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!"+ socket.id);
  // Receiving Todos from client
  socket.on('addRequest', (request) => {
    console.log('socketData: '+JSON.stringify(request));
    todoController.addTodo(io,request);
  });

  // Receiving Updated Todo from client
  socket.on('updateRequest', (Todo) => {
    console.log('socketData: '+JSON.stringify(request));
    todoController.updateTodo(io,request);
  });

  
})


server.listen(port, () => console.log(`Listening on port ${port}`));