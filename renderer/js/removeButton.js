import { nextSerialNum, setNextSerialNum, handleSerialNum } from "./serialNumLogic.js";

export { toggleHighlight };

function toggleHighlight (event) {
    const parentClassList = event.target.parentElement.classList;

    //  Spread Operator needed to make the classList an Array
    if ([...parentClassList].includes('row-item')) {
        parentClassList.toggle('highlight');
    }
}

const removeButton = document.querySelector('.remove-button');

removeButton.addEventListener('click', () => {
    let highlightedElements = document.querySelectorAll('.highlight');

    highlightedElements.forEach((element) => {
        element.remove();
        setNextSerialNum(nextSerialNum - 1);
    });

    handleSerialNum();
});