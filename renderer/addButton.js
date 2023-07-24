const addButton = document.querySelector('.add-button');

let fileObjects = [];
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
    let newFileObjects = [];
    for (let i=0; i<filePaths.length; i++) {
        let newFileObject = {fileName: path.parse(path.basename(filePaths[i])).name, filePath: filePaths[i], ...pdfPageObject[i]}
        fileObjects.push(newFileObject);
        newFileObjects.push(newFileObject);
    }

    newFileObjects.forEach( (newFileObject) => {
        createRowRecord(newFileObject);
    });
});


function createRowRecord(newRecord) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add("row-container", "row-item", "draggable");
    rowContainer.draggable = "true";

    const serialNum = document.createElement('p');
    serialNum.classList.add('serial-num');
    serialNum.textContent = '1';

    const pdfName = document.createElement('p');
    pdfName.classList.add('pdf-name');
    pdfName.textContent = newRecord.fileName;

    const firstPage = document.createElement('p');
    firstPage.classList.add('first-page');
    firstPage.textContent = newRecord.firstPage;

    const lastPage = document.createElement('p');
    lastPage.classList.add('last-page');
    lastPage.textContent = newRecord.lastPage;

    rowContainer.appendChild(serialNum);
    rowContainer.appendChild(pdfName);
    rowContainer.appendChild(firstPage);
    rowContainer.appendChild(lastPage);

    const tableContainer = document.querySelector('.table-container');
    tableContainer.appendChild(rowContainer);
}


{/* <div class="row-container row-item draggable" draggable="true">
    <p class="serial-num">2</p>
    <p class="pdf-name">Random PDF-2</p>
    <p class="first-page">2</p>
    <p class="last-page">5</p>
</div> */}