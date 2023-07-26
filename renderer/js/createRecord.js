import { dragStart, dragEnd } from './draggable.js';
import { toggleHighlight } from './removeButton.js';
import { nextSerialNum, setNextSerialNum } from './serialNumLogic.js'
import { decreasePageNum, increasePageNum } from './pageContainerButton.js';

export { createRecord };


function createPageContainer (type, pageValue) {
    const pageContainer = document.createElement('div');
    pageContainer.classList.add(`${type}-page-container`);

    const minusButton = document.createElement('button');
    minusButton.addEventListener('click', decreasePageNum);

    const minusImg = document.createElement('img');
    minusImg.src = './images/minus.png';
    minusImg.alt = 'minus image';

    minusButton.appendChild(minusImg);

    const page = document.createElement('p');
    page.classList.add(`${type}-page`)
    page.textContent = pageValue;

    const plusButton = document.createElement('button');
    plusButton.addEventListener('click', increasePageNum);

    const plusImg = document.createElement('img');
    plusImg.src = './images/plus.png';
    plusImg.alt = 'plus image';

    plusButton.appendChild(plusImg);

    pageContainer.appendChild(minusButton);
    pageContainer.appendChild(page);
    pageContainer.appendChild(plusButton);

    return pageContainer;
}


function createHiddenContainer (record) {
    const hiddenContainer = document.createElement('div');
    hiddenContainer.classList.add('hidden');

    const totalPage = document.createElement('p');
    totalPage.classList.add('total-page');
    totalPage.textContent = record.lastPage;

    const filePath = document.createElement('p');
    filePath.classList.add('file-path');
    filePath.textContent = record.filePath;

    hiddenContainer.appendChild(totalPage);
    hiddenContainer.appendChild(filePath);

    return hiddenContainer;
}


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

    const firstPageContainer = createPageContainer('first', newRecord.firstPage);

    const lastPageContainer = createPageContainer('last', newRecord.lastPage);

    const hiddenContainer = createHiddenContainer(newRecord);

    rowContainer.appendChild(serialNum);
    rowContainer.appendChild(pdfName);
    rowContainer.appendChild(firstPageContainer);
    rowContainer.appendChild(lastPageContainer);
    rowContainer.appendChild(hiddenContainer);

    const tableContainer = document.querySelector('.table-container');
    tableContainer.appendChild(rowContainer);
}