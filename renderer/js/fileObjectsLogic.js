export { fileObjects, handleFileObjects };


let fileObjects = [];

function handleFileObjects() {
    const fileRecords = [...document.querySelectorAll('.row-item')];

    fileObjects = fileRecords.map((item) => {
        return {fileName: item.querySelector('.pdf-name').textContent, 
            filePath: item.querySelector('.file-path').textContent,
            firstPage: item.querySelector('.first-page').textContent,
            lastPage: item.querySelector('.last-page').textContent,
        };
    });
}