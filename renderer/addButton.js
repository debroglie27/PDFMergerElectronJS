const addButton = document.querySelector('.add-button');


addButton.addEventListener('click', () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = 'multiple';
    input.onchange = (event) => {
        event.preventDefault();

        let files = Array.from(input.files);
        const filePaths = files.map(file => {
            return file.path;
        });

        console.log("hehehehe");
        // Send to main using ipcRenderer
        ipcRenderer.send('pdf:filepaths', filePaths);
    };
    input.click();
});


// Catch the pdf:pageobject event
ipcRenderer.on("pdf:pageobject", (pdfPageObject) => {
    console.log(pdfPageObject);
});