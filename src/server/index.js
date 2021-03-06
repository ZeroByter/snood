const express = require('express');
const { defaultMap, snoodSize } = require('../shared/constants');
const { randomString } = require('../shared/essentials');
const app = express();

const http = require("http").Server(app)
const io = require("socket.io")(http)

const isDev = process.env.NODE_ENV !== "production"

app.use(express.static('dist'));

//api example
//app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

const currentMap = defaultMap
let snoods = {}

snoods[randomString()] = {
    x: defaultMap.initialsnoodPosition[0],
    y: defaultMap.initialsnoodPosition[1],
    fertile: false,
}

const newsnood = (x, y) => {
    let newsnoodId = randomString()
    let newsnood = {
        x,
        y
    }

    snoods[newsnoodId] = newsnood

    io.emit("newEntity", {
        type: "snood",
        id: newsnoodId,
        location: {
            x: newsnood.x,
            y: newsnood.y,
        }
    })

    return newsnoodId
}

setInterval(() => {
    Object.entries(snoods).forEach(entry => {
        const id = entry[0]
        const snood = entry[1]

        //newsnood(snood.x + snoodSize, snood.y)
    })
}, 2000)

io.on("connection", socket => {
    socket.emit("getId", socket.id)

    socket.emit("allEntities", {
        snoods
    })
})

http.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));