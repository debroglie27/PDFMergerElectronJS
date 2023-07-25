export {alertSuccess, alertError};


// For Alerting Success
function alertSuccess(message) {
    Toastify.toast({
        text: message,
        duration: 2000,
        close: false,
        style: {
            width: '100%', background: 'green', color: 'white', 
            textAlign: 'center', padding: '5px',
        }
    });
}


// For Alerting Error
function alertError(message) {
    Toastify.toast({
        text: message,
        duration: 2000,
        close: false,
        style: {
            width: '100%', background: 'red', color: 'white',
            textAlign: 'center', padding: '5px',
        }
    });
}