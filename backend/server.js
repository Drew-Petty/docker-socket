const express = require("express");
const app = express();
const port = 3001;


const server = app.listen(port, () => console.log(`running on port ${port}`))
const io = require("socket.io")(server, {cors:true})

// emitters - passes data  where it needs to go

// on - trigger -- listening for a particular event

// Name of the trigger
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('chat',msg=>{
        console.log("got the message: "+msg );
        io.emit('post chat', msg)
    })
})