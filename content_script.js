const Storage = chrome.storage.sync

window.addEventListener("click", notifyBackground);

function notifyBackground() {
    Storage.get('isEnabled', value => {
        
        if (value.isEnabled) {
            let request = chrome.runtime.sendMessage({
                block: true
            });
            //runtime.sendMessage returns a Promise so we can use then 
            request.then(onResponse, onError);
        }
    })
}

function onResponse(message) {
    return message
}
  
function onError(error) {
    console.error(`Extension Tabblock Error: ${error}`);
}