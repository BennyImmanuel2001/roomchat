const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {

  console.log('connected');

  // to send and receive text message
  socket.on('msg', (msg) => {
    console.log(msg);
    //io.emit('msg', msg);
    console.log(socket.id);
    let message = {
      id: socket.id,
      msg
    }

    socket.broadcast.emit("msg", message);
  })


  socket.on('disconnecting', () => {
    console.log("user left"); 
  });

  // to send and receive audio message
  socket.on('mic_rec', (msg) => {
    //console.log(msg);
    socket.broadcast.emit("mic_rec", msg);
  })

  // to send and receive images
  socket.on('image_sent', (img) => {
    socket.broadcast.emit("image_sent", img);
  })

})

var port = 8000;

http.listen(port, () => console.log(`listening on port ${port}`));



//const imageToBase64 = require('image-to-base64');

// imageToBase64("./rec.png")
    //   .then(
    //     (response) => {

    //       //data:image/jpeg;base64,
    //       console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       console.log(error); // Logs an error if there was one
    //     }
    //   )
