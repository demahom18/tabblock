window.addEventListener("click", notifyBackground);

function notifyBackground() {
    chrome.storage.sync.get('isEnabled', value => {
        
        if (value.isEnabled) {
            let request = chrome.runtime.sendMessage({
                block: true
            });
            //runtime.sendMessage returns a Promise so we can use then 
            request.then(onResponse, onError);
        }
    })
}

function onResponse() {
    return
}
  
function onError(error) {
    console.error(`Extension Tabblock Error: ${error}`);
}