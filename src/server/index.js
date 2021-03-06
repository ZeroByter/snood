const express = require('express');
const app = express();

const http = require("http").Server(app)
const io = require("socket.io")(http)

const isDev = process.env.NODE_ENV !== "production"

app.use(express.static('dist'));

//api example
//app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

io.on("connection", socket => {
    socket.emit("getId", socket.id)
})

http.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));