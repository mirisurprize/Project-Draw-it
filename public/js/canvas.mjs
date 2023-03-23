let canv = document.getElementById("canv");
let ctx = canv.getContext("2d");

document.addEventListener("mouseup",  startDrawing);
document.addEventListener("mousedown", stopDrawing);
document.addEventListener("mousemove", currentlydraw);

let coordinations = {x:0, y:0};
let paint = false;

function getPos(e){
    coordinations.x = e.clientX - canv.offsetLeft;
    coordinations.y = e.clientY - canv.offsetTop;
}

function startDrawing(e){
    paint = true;
    getPos(e);
}

function stopDrawing(e){
    paint = false;
    getPos(e);
}

function currentlydraw(e){
    if(!paint) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "lightgreen";

        ctx.moveTo(coordinations.x, coordinations.y);
        getPos(e);

        ctx.lineTo(coordinations.x, coordinations.y);
        ctx.stroke();
        
    }
}
