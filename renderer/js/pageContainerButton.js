export { decreasePageNum, increasePageNum };


function decreasePageNum (event) {
    const button = event.currentTarget;
    const parentClassList = button.parentElement.classList;

    // Button belongs to first page container
    if ([...parentClassList].includes('first-page-container')) {
        const firstPage = button.parentElement.querySelector('.first-page');

        // Making sure first page does not become less than 1
        if (Number(firstPage.textContent) > 1) {
            firstPage.textContent = Number(firstPage.textContent) - 1;
        }
    }
    // Button belongs to last page container
    else {
        const lastPage = button.parentElement.querySelector('.last-page');
        const firstPage = button.parentElement.parentElement.querySelector('.first-page');

        // Making sure last page does not become smaller than first page
        if (Number(lastPage.textContent) > Number(firstPage.textContent)) {
            lastPage.textContent = Number(lastPage.textContent) - 1;
        }
    }
}

function increasePageNum (event) {
    // button element that was clicked
    const button = event.currentTarget;
    const parentClassList = button.parentElement.classList;

    // Button belongs to first page container
    if ([...parentClassList].includes('first-page-container')) {
        const firstPage = button.parentElement.querySelector('.first-page');
        const lastPage = button.parentElement.parentElement.querySelector('.last-page');

        // Making sure first page does not become larger than last page
        if (Number(firstPage.textContent) < Number(lastPage.textContent)) {
            firstPage.textContent = Number(firstPage.textContent) + 1;
        }
    }
    // Button belongs to last page container
    else {
        const lastPage = button.parentElement.querySelector('.last-page');
        const totalPage = button.parentElement.parentElement.querySelector('.total-page');

        // Making sure last page does not become larger than last page of pdf
        if (Number(lastPage.textContent) < Number(totalPage.textContent)) {
            lastPage.textContent = Number(lastPage.textContent) + 1;
        }
    }
}