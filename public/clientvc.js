const localVideoComponent = document.getElementById("local-video");
const remoteVideoComponent = document.getElementById("remote-video");

const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
};
let localStream;
let remoteStream;
let isRoomCreator;
let rtcPeerConnection; // Connection between the local device and the remote peer.
let urlinfo = new URLSearchParams(location.search);
let roomId = urlinfo.get("id") || "test";

// Free public STUN servers provided by Google.
const iceServers = {
  iceServers: [
    // {
    //   urls: "turn:localhost:25436",
    //   username: "password",
    //   credentials: "homeo",
//     // },
//     {
//       urls: "turn:openrelay.metered.ca:443",
//       username: "openrelayproject",
//       credentials: "openrelayproject",
//     },
    // {
    //   urls: "turn:turn.bistri.com:80",
    //   username: "homeo",
    //   credentials: "homeo",
    // },
//     { urls: "stun:meet-jit-si-turnrelay.jitsi.net:443" },
    // { urls: "stun:stun.l.google.com:19302" },
    // { urls: "stun:stun1.l.google.com:19302" },
    // { urls: "stun:stun2.l.google.com:19302" },
    // { urls: "stun:stun3.l.google.com:19302" },
    // { urls: "stun:stun4.l.google.com:19302" },
    {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ],
        },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
        },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808',
        },
  ],
};

let ws = socket();
ws.on("msg", (e) => console.log(e));

ws.emit("join", roomId);

// SOCKET EVENT CALLBACKS =====================================================
ws.on("room_created", async () => {
  console.log("Socket event callback: room_created");

  await setLocalStream(mediaConstraints);
  isRoomCreator = true;
});

ws.on("room_joined", async () => {
  console.log("Socket event callback: room_joined");

  await setLocalStream(mediaConstraints);
  ws.emit("start_call", roomId);
});

ws.on("full_room", () => {
  console.log("Socket event callback: full_room");

  alert("The room is full, please try another one");
});

ws.on("close", () => {
  console.log("first");
});

// FUNCTIONS ==================================================================
// function joinRoom(room) {
//   if (room === '') {
//     alert('Please type a room ID')
//   } else {
//     roomId = room
//     ws.emit('join', room)
//     showVideoConference()
//   }
// }

function showVideoConference() {
  roomSelectionContainer.style = "display: none";
  videoChatContainer.style = "display: block";
}

async function setLocalStream(mediaConstraints) {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  } catch (error) {
    console.error("Could not get user media", error);
  }

  localStream = stream;
  localVideoComponent.srcObject = stream;
}

// SOCKET EVENT CALLBACKS =====================================================
ws.of(roomId).on("start_call", async () => {
  console.log("Socket event callback: start_call");

  if (isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    rtcPeerConnection.onnegotiationneeded = async () => {
      console.log("neg needed");
      try {
        await rtcPeerConnection.setLocalDescription();
        ws.emit("desc_send", { desc: rtcPeerConnection.localDescription, roomId });
      } catch (error) {
        console.error("desc send error: ", error);
      }
    };
    // await createOffer(rtcPeerConnection);
  }
});

ws.of(roomId).on("desc_send", async (event) => {
  console.log("Socket event callback: desc_send", event);
  // console.log(isRoomCreator, event);

  if (!isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    // rtcPeerConnection.onnegotiationneeded = async () => {
    //   console.log("neg needed");
    // };
    rtcPeerConnection.setRemoteDescription(event);
    await rtcPeerConnection.setLocalDescription();
    ws.emit("desc_get", { desc: rtcPeerConnection.localDescription, roomId });

    // await createAnswer(rtcPeerConnection);
  }
});

ws.of(roomId).on("desc_get", (event) => {
  console.log("Socket event callback: desc_get");
  // console.log(isRoomCreator, event);
  rtcPeerConnection.setRemoteDescription(event);
});

ws.of(roomId).on("webrtc_offer", async (event) => {
  console.log("Socket event callback: webrtc_offer");
  // console.log(isRoomCreator, event);

  if (!isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    rtcPeerConnection.onnegotiationneeded = async () => {
      console.log("neg needed");
    };
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
    await createAnswer(rtcPeerConnection);
  }
});

ws.of(roomId).on("webrtc_answer", (event) => {
  console.log("Socket event callback: webrtc_answer");
  // console.log(isRoomCreator, event);
  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
});

ws.of(roomId).on("webrtc_ice_candidate", (event) => {
  console.log("Socket event callback: webrtc_ice_candidate");

  // ICE candidate configuration.
  // var candidate = new RTCIceCandidate({
  //   sdpMLineIndex: event.label,
  //   candidate: event.candidate,
  // });
  rtcPeerConnection.addIceCandidate(event.candidate);
});

// FUNCTIONS ==================================================================
function addLocalTracks(rtcPeerConnection) {
  localStream.getTracks().forEach((track) => {
    rtcPeerConnection.addTrack(track, localStream);
  });
}

async function createOffer(rtcPeerConnection) {
  let sessionDescription;
  try {
    sessionDescription = await rtcPeerConnection.createOffer();
    rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (error) {
    console.error(error);
  }

  ws.emit("webrtc_offer", {
    type: "webrtc_offer",
    sdp: sessionDescription,
    roomId,
  });
}

ws.of(roomId).on("end_call", () => {
  location.replace("/end");
});

function endCall() {
  ws.emit("end_call", roomId);
  location.replace("/end");
}

async function createAnswer(rtcPeerConnection) {
  let sessionDescription;
  try {
    sessionDescription = await rtcPeerConnection.createAnswer();
    rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (error) {
    console.error(error);
  }

  ws.emit("webrtc_answer", {
    type: "webrtc_answer",
    sdp: sessionDescription,
    roomId,
  });
}

function setRemoteStream(event) {
  remoteVideoComponent.srcObject = event.streams[0];
  remoteStream = event.stream;
}

function sendIceCandidate(event) {
  if (event.candidate) {
    ws.emit("webrtc_ice_candidate", {
      roomId,
      // label: event.candidate.sdpMLineIndex,
      candidate: event.candidate,
    });
  }
}
