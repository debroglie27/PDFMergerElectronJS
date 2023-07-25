import { nextSerialNum } from "./createRecord.js";

export {handleSerialNum}

function handleSerialNum () {
    const serialNumList = document.querySelectorAll('.serial-num');

    for (let i = 1; i < nextSerialNum; i++) {
        serialNumList[i].textContent = i;
    }
}