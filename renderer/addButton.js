const addButton = document.querySelector('.add-button');
let filePaths = [];


addButton.addEventListener('click', () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = 'multiple';
    input.onchange = _ => {
        let files = Array.from(input.files);
        filePaths = files.map(file => {
            return file.path;
        });
    };
    input.click();
});