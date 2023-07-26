export { decreasePageNum, increasePageNum };


function decreasePageNum (event) {
    const parentClassList = event.target.parentElement.classList;

    if ([...parentClassList].includes('first-page-container')) {
        const firstPage = event.target.parentElement.querySelector('.first-page');

        if (Number(firstPage.textContent) > 1) {
            firstPage.textContent = Number(firstPage.textContent) - 1;
        }
    }
    else {
        const lastPage = event.target.parentElement.querySelector('.last-page');
        // const firstPageConst = event.target.parentElement.parentElement.querySelector('.first-page-const');
        console.log(event.target.parentElement.parentElement.querySelector('.hidden .first-page-const'));

        // if (Number(lastPage.textContent) > Number(firstPageConst.textContent)) {
        //     lastPage.textContent = Number(lastPage.textContent) - 1;
        // }
    }
}

function increasePageNum (event) {

}