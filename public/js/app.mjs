import translations from "./translations.mjs";

let currentLanguage = "en";
let dictionary = translations[currentLanguage];

const drawing = document.getElementById("canv");
const saveBtn = document.getElementById("save");
const deleteBtn = document.getElementById("delete");
const refreshL = document.getElementById("refreshL")

refreshL.onclick = (e) => {
    swapLanguage();
}

saveBtn.onclick = async (e) => {
    await saveDrawing(drawing);
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

refreshUI();