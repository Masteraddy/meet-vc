const https = require("https");
const http = require("http");
const path = require("path");
const express = require("express");
const moduleConcat = require("module-concat");
const fs = require("fs");
const WebSocket = require("ws");
const WsWrapper = require("ws-server-wrapper");

const app = express();
const privateKey = fs.readFileSync(`${__dirname}/keys/key.pem`, "utf8");
const certificate = fs.readFileSync(`${__dirname}/keys/cert.pem`, "utf8");

const genID = require("./libs/idgen");

const cred = { key: privateKey, cert: certificate };

const server =
  process.env.NODE_ENV === "production" ? http.createServer(app) : https.createServer(cred, app);

const wss = new WebSocket.WebSocketServer({ server });

let sockets = new WsWrapper(wss);

let rooms = {};

const leave = (room, uuid) => {
  // not present: do nothing
  if (!rooms[room][uuid]) return;
  // if the one exiting is the last one, destroy the room
  // if (Object.keys(rooms[room]).length === 1) delete rooms[room];
  // otherwise simply leave the room
  else delete rooms[room][uuid];
};

sockets.on("connection", (socket) => {
  // console.log(socket);
  const uuid = genID(); // create here a uuid for this connection
  socket.id = uuid;

  socket.on("join", (roomID) => {
    if (!rooms[roomID]) rooms[roomID] = {}; // create the room
    let size = Object.keys(rooms[roomID]).length;
    if (!rooms[roomID][uuid]) rooms[roomID][uuid] = socket; // join the room
    // console.log(size);
    socket.room = roomID;
    socket.broadcast = (room, meta, data) => {
      Object.entries(rooms[room]).forEach(([, sock]) => {
        if (socket === sock) return;
        sock.of(room).emit(meta, data);
      });
    };

    if (size == 0) {
      socket.emit("room_created", roomID);
      console.log(`Creating room ${roomID} and emitting room_created socket event`);
    } else if (size == 1) {
      socket.emit("room_joined", roomID);
      console.log(`Joining room ${roomID} and emitting room_joined socket event`);
    } else {
      socket.emit("full_room", roomID);
      console.log(`Can't join room ${roomID}, emitting full_room socket event`);
    }
  });

  // These events are emitted to all the sockets connected to the same room except the sender.
  socket.on("desc_send", (event) => {
    console.log(`Broadcasting desc_send event to peers in room ${event.roomId}`);
    // socket.of(event.roomId).emit("webrtc_offer", event.sdp);
    socket.broadcast(event.roomId, "desc_send", event.desc);
  });
  socket.on("desc_get", (event) => {
    console.log(`Broadcasting desc_get event to peers in room ${event.roomId}`);
    // socket.of(event.roomId).emit("webrtc_offer", event.sdp);
    socket.broadcast(event.roomId, "desc_get", event.desc);
  });
  socket.on("start_call", (roomId) => {
    console.log(`Broadcasting start_call event to peers in room ${roomId}`);
    // socket.of(roomId).emit("start_call");
    socket.broadcast(roomId, "start_call");
  });
  socket.on("webrtc_offer", (event) => {
    console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`);
    // socket.of(event.roomId).emit("webrtc_offer", event.sdp);
    socket.broadcast(event.roomId, "webrtc_offer", event.sdp);
  });
  socket.on("webrtc_answer", (event) => {
    console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`);
    // socket.of(event.roomId).emit("webrtc_answer", event.sdp);
    socket.broadcast(event.roomId, "webrtc_answer", event.sdp);
  });
  socket.on("webrtc_ice_candidate", (event) => {
    console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`);
    // socket.of(event.roomId).emit("webrtc_ice_candidate", event);
    socket.broadcast(event.roomId, "webrtc_ice_candidate", event);
  });
  socket.on("end_call", (room) => {
    socket.broadcast(room, "end_call");
  });

  // socket.emit("msg", "Hello");

  // socket.on("sent", (evt) => {
  //   console.log(evt);
  // });
  // socket.of("addy").on("hello", (e) => console.log(e));
  socket.on("close", () => {
    console.log("socket close");
    // for each room, remove the closed socket
    Object.keys(rooms).forEach((room) => leave(room, uuid));
  });
});

app.use(express.static("public"));

var PORT = process.env.PORT || 3010;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "test.html"));
});

app.get("/end", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "end.html"));
});

// Build client.js using "node-module-concat"
// moduleConcat(__dirname + "/public/test.js", __dirname + "/public/build.js", function (err, stats) {
//   if (err) {
//     throw err;
//   }
//   const files = stats.files;
//   console.log(`${files.length} files combined into build:\n`, files);

//   server.listen(PORT, () => {
//     console.log("Listening on port " + PORT);
//   });
// });

server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
