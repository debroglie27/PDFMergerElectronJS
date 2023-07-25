import { dragStart, dragEnd } from './draggable.js';
import { toggleHighlight } from './removeButton.js';
import { nextSerialNum, setNextSerialNum } from './serialNumLogic.js'

export { createRecord };


function createRecord(newRecord) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add("row-container", "row-item", "draggable");
    rowContainer.draggable = "true";

    rowContainer.addEventListener('dragstart', dragStart);
    rowContainer.addEventListener('dragend', dragEnd);
    rowContainer.addEventListener('click', toggleHighlight);

    const serialNum = document.createElement('p');
    serialNum.classList.add('serial-num');
    serialNum.textContent = nextSerialNum;

    setNextSerialNum(nextSerialNum + 1);

    const pdfName = document.createElement('p');
    pdfName.classList.add('pdf-name');
    pdfName.textContent = newRecord.fileName;

    const firstPage = document.createElement('p');
    firstPage.classList.add('first-page');
    firstPage.textContent = newRecord.firstPage;

    const lastPage = document.createElement('p');
    lastPage.classList.add('last-page');
    lastPage.textContent = newRecord.lastPage;

    const filePath = document.createElement('p');
    filePath.classList.add('hidden');
    filePath.textContent = newRecord.filePath;

    rowContainer.appendChild(serialNum);
    rowContainer.appendChild(pdfName);
    rowContainer.appendChild(firstPage);
    rowContainer.appendChild(lastPage);
    rowContainer.appendChild(filePath);

    const tableContainer = document.querySelector('.table-container');
    tableContainer.appendChild(rowContainer);
}
