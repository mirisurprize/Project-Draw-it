//const express = require("express");
import express from "express"
import * as pg from "pg"
const server = express();
const port = (process.env.PORT || 8080);
server.use(express.json())  

const {Client} = pg.default;

const db = process.env.DATABASE_URL;
const credentials = {
    connections: db,
    ssl: {
        rejectUnauthorized: false
    }
}

const drawings = [];

server.set("port", port);
server.use(express.static("public"));

server.get("/drawing/:id",getDrawing);
server.post("/drawing", saveDrawing);
server.put("/drawing/:id",updateDrawing);
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
    const drawing = req.body.data;
    console.log(drawing);
    drawings.push(drawing);
    resp.json({drawingId:drawings.length})
}   

function updateDrawing(req,resp,next){
    let drawingID = req.params.id;
    if(drawingID <= drawings.length){
        
    }
}



server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
})
