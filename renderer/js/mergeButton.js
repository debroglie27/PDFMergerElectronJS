import { fileObjects, handleFileObjects } from "./fileObjectsLogic.js";
import { alertSuccess, alertError } from "./toastifyAlertLogic.js";

const mergeButton = document.querySelector('.merge-button');

mergeButton.addEventListener('click', () => {
    handleFileObjects();

    if (fileObjects.length === 0) {
        alertError('No PDF Files to Merge!');
        return;
    }

    // Send to main using ipcRenderer
    ipcRenderer.send('pdf:merge', fileObjects);
});


// Catch the pdf:mergesuccess event
ipcRenderer.on("pdf:mergesuccess", () => {
    alertSuccess('PDF Files Successfully Merged!');
});


// Catch the pdf:mergecancelled event
ipcRenderer.on("pdf:mergecancelled", () => {
    fileObjects = [];
});