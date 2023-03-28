import translations from "./translations.mjs";

let currentLanguage = "en";
let dictionary = translations[currentLanguage];
let drawingId = null;
const drawing = document.getElementById("canv");
const saveBtn = document.getElementById("save");
const deleteBtn = document.getElementById("delete");
const showDrawingBtn = document.getElementById("showDrawingBtn");
const newLanguageBtn = document.getElementById("newLanguageBtn");


newLanguageBtn.onclick = (e) => {
    swapLanguage();
}

saveBtn.onclick = async (e) => {
    await saveDrawing(drawing);
}

deleteBtn.onclick = async (e) => {
    await deleteDrawing(drawingId);
}

showDrawingBtn.onclick = async (e) => {
  await getDrawing(drawing);
}


function swapLanguage(){
    if (currentLanguage === "en"){
        currentLanguage = "ita"
    } else {
        currentLanguage = "en"
    }

    dictionary = translations[currentLanguage];
    refreshUI();
}

function refreshUI(){
    const uiElements = document.querySelectorAll("[data-translate]");

    for (const element of uiElements) {
        const translationKey = element.getAttribute("data-translate")
        element.innerText = dictionary[translationKey];
    }
}

async function saveDrawing(canvasElement){
    const drawingData = canvasElement.toDataURL("image/jpeg", 0.7);
    drawingId = await postData("/drawing",drawingData);
    console.log("/drawing/"+drawingId);
}

async function deleteDrawing(drawingID){
    const drawingData = canvasElement.toDataURL("image/jpeg", 0.7);
    await deleteData("/drawing/" + drawingID,{drawingData})

    console.log("/drawing/:id"+drawingID+"-deleted");
    
}

async function getDrawing(canvasElement){
    const drawingData = canvasElement.toDataURL("image/jpeg", 0.7);
    const drawingId = await getData("/drawing/" + drawingId,{drawingData})

    console.log("/drawing/:id"+drawingId+"-view");
}

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({data}) 
    });
    return response.json(); 
  }


  async function deleteData(url = "", data = {}) {
    
    const response = await fetch(url, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data),
    });
    return response.json(); 
  }

  async function getData(url = "", data = {}) {
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(data), 
    });
    return response.json();
  }

refreshUI();