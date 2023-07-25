import { createRecord } from './createRecord.js';

const addButton = document.querySelector('.add-button');

let filePaths = [];


addButton.addEventListener('click', () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = 'multiple';
    input.onchange = (event) => {
        event.preventDefault();

        let files = Array.from(input.files);
        filePaths = files.map(file => {
            return file.path;
        });

        // Send to main using ipcRenderer
        ipcRenderer.send('pdf:filepaths', filePaths);
    };
    input.click();
});


// Catch the pdf:pageobject event
ipcRenderer.on("pdf:pageobject", (pdfPageObject) => {
    for (let i=0; i<filePaths.length; i++) {
        let newFileObject = {fileName: path.parse(path.basename(filePaths[i])).name, 
            filePath: filePaths[i], 
            ...pdfPageObject[i]};

        createRecord(newFileObject);
    }
});
