//const express = require("express");
import express from "express"
const server = express();
const port = (process.env.PORT || 8080);

const drawings = [];

server.set("port", port);
server.use(express.static("public"));
server.get("/drawing/:id",getDrawing);
server.post("/drawing", saveDrawing);
server.delete("/drawing/:id",deleteDrawing);

function deleteDrawing(req,resp,next){

    let drawingID = req.params.id;
    if(drawingID <= drawings.length){
        drawings.splice(drawingID-1,0)
        resp.status(200).end();
    }

}

function getDrawing(req,resp,next){
    let drawingID = req.params.id;
    if(drawingID <= drawings.length){
        resp.json({drawingData:drawings[drawingID-1]})
    }
}

function saveDrawing(req,resp,next){
    const drawing = req.body.drawingData;
    drawings.push(drawing);
    resp.json({drawingId:drawings.length})
}   




server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
})
