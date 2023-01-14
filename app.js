// Import Packages
const { v4: uuidv4 } = require("uuid");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");
const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// Initialise Constants

// Configurations
app.set("view engine", "ejs");
app.use("/peerjs", peerServer);
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  return res.redirect(`/${uuidv4()}`);
});

app.get("/:id", (req, res) => {
  return res.render("index", { roomID: req.params.id });
});

// Server & Socket Setup
io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("join-room", (roomID, userID) => {
    socket.join(roomID);
    socket.to(roomID).emit("user-connected", userID);
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      style: "capital",
      separator: " ",
    });
    socket.on("message", (message) => {
      io.to(roomID).emit("create-message", message, randomName);
    });
    socket.on("disconnect", () => {
      socket.to(roomID).emit("user-disconnected", userID);
    });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
