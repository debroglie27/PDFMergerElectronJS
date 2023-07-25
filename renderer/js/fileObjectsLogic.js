export { fileObjects, setFileObjects, appendFileObjects, handleFileObjects };


let fileObjects = [];

function setFileObjects (value) {
    fileObjects = value;
}

function appendFileObjects (value) {
    fileObjects.push(value);
}

function handleFileObjects() {
    const fileRecords = [...document.querySelectorAll('.row-item')];

    const newFileObjects = fileRecords.map((item) => {
        return {fileName: item.querySelector('.pdf-name').textContent, 
            filePath: item.querySelector('.hidden').textContent,
            firstPage: item.querySelector('.first-page').textContent,
            lastPage: item.querySelector('.last-page').textContent,
        };
    });

    setFileObjects(newFileObjects);
}