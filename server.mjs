//const express = require("express");
import express from "express"
import * as pg from "pg"
const server = express();
const port = (process.env.PORT || 8080);
server.use(express.json())  

const {Client} = pg.default; //why in curly brackets

const db = process.env.DATABASE_URL || "postgres://draw_it_database_user:jU9TEk08NLtjzLrOsb2y8fdIdIP6AEVR@dpg-cghbnrt269v15ekvmqjg-a.frankfurt-postgres.render.com/draw_it_database";
const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false 
    }}



const drawings = [];

server.set("port", port);
server.use(express.static("public"));


server.put("/drawing/:id",updateDrawing);

server.post("/drawing", async function (req, resp) {
    console.log("Drawing Saved!");
    const client = new Client(credentials);
    let checkResults = null;
    const drawing = req.body.data;

    try{
        client.connect();//open connection to database
        const query = 'INSERT INTO public."Drawings"(img) VALUES ($1) RETURNING *';
        const values = [drawing];
        checkResults = await client.query(query,values);
        console.log("The result of the query: ", checkResults);
        resp.status(201).json({message: "Drawing added!", id:checkResults.rows[0].Id});
    } catch (error){
        console.error("Something went wrong:", error);
        resp.status(500).json({message: "Could't save drawing"});
    } finally {
        console.log("Response being sent back to client", resp);//?
        client.end();//ends connection
    }

    console.log("...")
} );

server.get("/drawing/:id", async function (req, resp){
    console.log("Here's your drawing!");
    const client = new Client(credentials);
    let checkResults = null;
    const drawings = req.id;

    try{
        client.connect();
        const query = 'SELECT * FROM PUBLIC."Drawings"'
        const values = [drawings];
        checkResults = await client.query(query,values);
        console.log("The result of the query: ", checkResults);
        resp.status(201).json({message: "Here's your drawing!", id:checkResults.rows[0].Id});

    } catch (error){
        console.error("Something went wrong:", error);
        resp.status(500).json({message:"Couldn't show drawing"});
    } finally {
        console.log("Response is being sent back to client", resp);
        client.end();
    }

    console.log("...")
});

server.delete("/drawing/:id",async function(req,resp){});


/*
function deleteDrawing(req,resp,next){

    let drawingID = req.params.id;
    if(drawingID <= drawings.length){
        drawings.splice(drawingID-1,0)
        resp.status(200).end();
    }

}*/

/*
function getDrawing(req,resp,next){
    let drawingID = req.params.id;
    if(drawingID <= drawings.length){
        resp.json({drawingData:drawings[drawingID-1]})
    }
}*/

 /*
function saveDrawing(req,resp,next){
    const drawing = req.body.data;
    console.log(drawing);
    drawings.push(drawing);
    resp.json({drawingId:drawings.length})
}   */

function updateDrawing(req,resp,next){
    let drawingID = req.params.id;
    if(drawingID <= drawings.length){
        
    }
}



server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
})
