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
    // Iterating through every filePath and creating a corresponding table record
    filePaths.forEach((filePath, index) => {
        const maxFileNameLength = 42;
        let fileName = path.parse(path.basename(filePath)).name;

        if (fileName.length > maxFileNameLength) {
            fileName = fileName.slice(0, maxFileNameLength) + '...';
        }

        let newFileObject = {
            fileName: fileName, 
            filePath: filePath, 
            ...pdfPageObject[index],
        };

        createRecord(newFileObject);
    });
});
