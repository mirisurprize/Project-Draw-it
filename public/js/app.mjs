import translations from "./translations.mjs";

let currentLanguage = "en";
let dictionary = translations[currentLanguage];

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
    await deleteDrawing(drawing);
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
    const drawingId = await postData("/drawing",{drawingData});

    console.log("/drawing/"+drawingId);
}

async function deleteDrawing(canvasElement){
    const drawingData = canvasElement.toDataURL("image/jpeg", 0.7);
    const drawingId = await deleteData("/drawing/:id",{drawingData})

    console.log("/drawing/:id"+drawingId+"-deleted");
}

async function getDrawing(canvasElement){
    const drawingData = canvasElement.toDataURL("image/jpeg", 0.7);
    const drawingId = await deleteData("/drawing/id",{drawingData})

    console.log("/drawing/:id"+drawingId+"-view");
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  async function deleteData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function getData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

refreshUI();