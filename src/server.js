import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();
app.set('view engine', 'pug');
app.set("views", __dirname + "/views");

app.use('/public', express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get('/*', (req, res) => res.redirect('/'))

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

// http server + ws server
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
 
// function handleConnection(socket) {
//     console.log(socket)
// }

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket['name'] = 'Anonymous';
    console.log("connected to Browser");
    socket.on('close', () => console.log('Disconnected from browser'))
    socket.on('message', message => {
        const parsedMsg = JSON.parse(message);
        if (parsedMsg.type === 'new_message') {
            sockets.forEach(aSocket => aSocket.send(`${socket.name}: ${parsedMsg.payload}`));
        } else if (parsedMsg.type === 'name') {
            socket['name'] = parsedMsg.payload;
            
        }
        // socket.send(message); // or, ~.toString();
    })
})

server.listen(3000, handleListen);