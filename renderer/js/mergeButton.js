import { fileObjects, handleFileObjects } from "./fileObjectsLogic.js";

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


// Catch the pdf:pageobject event
ipcRenderer.on("pdf:mergesuccess", () => {
    alertSuccess('PDF Files Successfully Merged!');
});


// For Alerting Success
function alertSuccess(message) {
    Toastify.toast({
        text: message,
        duration: 2000,
        close: false,
        style: {
            width: '100%', background: 'green', color: 'white', 
            textAlign: 'center', padding: '5px',
        }
    });
}


// For Alerting Success
function alertError(message) {
    Toastify.toast({
        text: message,
        duration: 2000,
        close: false,
        style: {
            width: '100%', background: 'red', color: 'white',
            textAlign: 'center', padding: '5px',
        }
    });
}