import { fileObjects } from "./fileObjectsLogic.js";

const mergeButton = document.querySelector('.merge-button');

mergeButton.addEventListener('click', () => {
    // Send to main using ipcRenderer
    ipcRenderer.send('pdf:merge', fileObjects);
});


// Catch the pdf:pageobject event
ipcRenderer.on("pdf:mergesuccess", () => {
    alertSuccess('PDF Successfully Merged!');
});


// For Alerting Success
function alertSuccess(message) {
    Toastify.toast({
        text: message,
        duration: 4000,
        close: false,
        style: {
            width: '100%',
            background: 'green',
            color: 'white',
            textAlign: 'center',
            padding: '5px',
        }
    });
}