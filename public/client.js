const roomSelectionContainer = document.getElementById("room-selection-container");
const roomInput = document.getElementById("room-input");
const connectButton = document.getElementById("connect-button");

const videoChatContainer = document.getElementById("video-chat-container");
const localVideoComponent = document.getElementById("local-video");
const remoteVideoComponent = document.getElementById("remote-video");

if ("WebSocket" in window) {
  console.log("WebSocket is supported by your Browser!");
} else {
  alert("WebSocket NOT supported by your Browser!");
}

let isRoomCreator;
const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
};

let urlinfo = new URLSearchParams(location.search);
let localStream;
let remoteStream;
let rtcPeerConnection; // Connection between the local device and the remote peer.
let roomId = urlinfo.get("id");

var ws = new WebSocket(`wss://${location.host}`);

const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

ws.onopen = function () {
  // Web Socket is connected, send data using send()
  ws.send(JSON.stringify({ meta: "joinRoom", data: {}, room: roomId }));
  console.log("Message is sent...");
};

ws.onmessage = async (evt) => {
  var dt = JSON.parse(evt.data);
  // console.log(dt);
  switch (dt.meta) {
    case "message":
      break;
    case "room_created":
      isRoomCreator = true;
      await setLocalStream(mediaConstraints);
      break;
    case "room_joined":
      await setLocalStream(mediaConstraints);
      ws.send(JSON.stringify({ meta: "start_call", data: {}, room: dt.room }));
      break;
    case "start_call":
      console.log("Socket event callback: start_call");

      if (isRoomCreator) {
        rtcPeerConnection = new RTCPeerConnection(iceServers);
        addLocalTracks(rtcPeerConnection);
        rtcPeerConnection.ontrack = setRemoteStream;
        rtcPeerConnection.onicecandidate = sendIceCandidate;
        await createOffer(rtcPeerConnection, dt.room);
      }
      break;
    case "webrtc_offer":
      console.log("Socket event callback: webrtc_offer");

      if (!isRoomCreator) {
        rtcPeerConnection = new RTCPeerConnection(iceServers);
        addLocalTracks(rtcPeerConnection);
        // rtcPeerConnection.ontrack = (str) => console.log(str);
        rtcPeerConnection.ontrack = setRemoteStream;
        rtcPeerConnection.onicecandidate = sendIceCandidate;
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(dt));
        await createAnswer(rtcPeerConnection, dt.room);
      }
      break;
    case "webrtc_answer":
      console.log("Socket event callback: webrtc_answer");
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(dt));
      break;
    case "webrtc_ice_candidate":
      console.log("Socket event callback: webrtc_ice_candidate");

      // ICE candidate configuration.
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: dt.label,
        candidate: dt.candidate,
      });
      rtcPeerConnection.addIceCandidate(candidate);
      break;
    default:
      break;
  }
};

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
// FUNCTIONS ==================================================================
function addLocalTracks(rtcPeerConnection) {
  localStream.getTracks().forEach((track) => {
    rtcPeerConnection.addTrack(track, localStream);
  });
}

async function createOffer(rtcPeerConnection, room) {
  let sessionDescription;
  try {
    sessionDescription = await rtcPeerConnection.createOffer();
    rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (error) {
    console.error(error);
  }

  ws.send(JSON.stringify({ meta: "webrtc_offer", data: sessionDescription, room }));
}

async function createAnswer(rtcPeerConnection, room) {
  let sessionDescription;
  try {
    sessionDescription = await rtcPeerConnection.createAnswer();
    rtcPeerConnection.setLocalDescription(sessionDescription);
  } catch (error) {
    console.error(error);
  }
  ws.send(JSON.stringify({ meta: "webrtc_answer", data: sessionDescription, room }));
}

function setRemoteStream(event) {
  remoteVideoComponent.srcObject = event.streams[0];
  remoteStream = event.stream;
}

function sendIceCandidate(event) {
  if (event.candidate) {
    console.log("event.candidate");
    ws.send(
      JSON.stringify({
        meta: "webrtc_ice_candidate",
        data: { label: event.candidate.sdpMLineIndex, candidate: event.candidate.candidate },
        room: roomId,
      })
    );
  }
}
