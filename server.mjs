const express = require("express");
const server = express();
const port = (process.env.PORT || 8080);

server.set("port",port);

server.use(express.static("public"));

server.get("/drawing", startDrawing);
server.post("/drawing", saveDrawing);
server.delete("/drawing/:index", deleteDrawing);
server.delete("/drawings", deleteAllDrawings);

