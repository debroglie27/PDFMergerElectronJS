import { fileObjects } from "./fileObjectsLogic.js";

const mergeButton = document.querySelector('.merge-button');

mergeButton.addEventListener('click', () => {
    // Send to main using ipcRenderer
    ipcRenderer.send('pdf:merge', fileObjects);
});