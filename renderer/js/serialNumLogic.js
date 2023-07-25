export {nextSerialNum, setNextSerialNum, handleSerialNum};

let nextSerialNum = 1;

function setNextSerialNum(value) {
    nextSerialNum = value;
}

function handleSerialNum () {
    const serialNumList = document.querySelectorAll('.serial-num');

    for (let i = 1; i < nextSerialNum; i++) {
        serialNumList[i].textContent = i;
    }
}