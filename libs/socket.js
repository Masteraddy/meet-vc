const genID = require("./idgen");
const { getActiveUser, exitRoom, newUser, getIndividualRoomUsers } = require("./userHelper");
const formater = require("./dateFormater");
let rooms = {};

const roomBroadcast = (meta, data = {}, room) => {
  data.meta = meta;
  data.room = room;
  Object.entries(rooms[room]).forEach(([, sock]) => sock.send(JSON.stringify(data)));
};

const leave = (room, uuid) => {
  // not present: do nothing
  if (!rooms[room][uuid]) return;

  // if the one exiting is the last one, destroy the room
  if (Object.keys(rooms[room]).length === 1) delete rooms[room];
  // otherwise simply leave the room
  else delete rooms[room][uuid];
};

const onSocketConnect = (socket, broadcast) => {
  const uuid = genID(); // create here a uuid for this connection
  socket.id = uuid;

  socket.on("message", (buffData) => {
    const dt = JSON.parse(buffData.toString());
    const { message, meta, data, room } = dt;
    const user = newUser(uuid, data?.username, room);
    console.log(rooms);
    switch (meta) {
      case "joinRoom":
        if (!rooms[user.room]) rooms[user.room] = {}; // create the room
        let size = Object.keys(rooms[user.room]).length;
        if (!rooms[user.room][uuid]) rooms[user.room][uuid] = socket; // join the room
        console.log(size);
        if (size == 0) {
          roomBroadcast("room_created", {}, user.room);
        } else if (size == 1) {
          roomBroadcast("room_joined", {}, user.room);
        } else {
          roomBroadcast("full_room", {}, user.room);
        }
        break;

      case "start_call":
        console.log(data);
        roomBroadcast("start_call", data, user.room);
        break;
      case "webrtc_offer":
        roomBroadcast("webrtc_offer", data, user.room);
        break;
      case "webrtc_answer":
        roomBroadcast("webrtc_answer", data, user.room);
        break;
      case "webrtc_ice_candidate":
        roomBroadcast("webrtc_ice_candidate", data, user.room);
        break;

      default:
        Object.entries(rooms[user.room]).forEach(([, sock]) => sock.send({ message }));
        break;
    }
  });

  socket.on("close", () => {
    const user = exitRoom(uuid);
    if (user) {
      let roomMsg = {
        message: formater("App", `${user.id} has left the room`),
      };
      roomBroadcast("message", roomMsg, user.room);
    }
    let currentActiveUser = {
      users: getIndividualRoomUsers(user.room),
    };

    roomBroadcast("roomUsers", currentActiveUser, user.room);
    // for each room, remove the closed socket
    Object.keys(rooms).forEach((room) => leave(room, uuid));
  });
};

module.exports = onSocketConnect;
