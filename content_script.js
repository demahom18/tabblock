window.addEventListener("click", notifyClickEvent);
const MAX_Z_INDEX = 2147483647

chrome.storage.onChanged.addListener(onStorageChange)

function notifyClickEvent() {
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

let initialWidth, initialHeight
function onStorageChange(state) {
    const iframe = document.querySelector('.videoWrapper iframe')
    
    console.log(state.video);

    if (!state.video) return
    
    if (state.video.newValue == true) {
        const { width, height } = iframe.getBoundingClientRect()
        initialWidth = width
        initialHeight = height

        iframe.style.width = '100vw'
        iframe.style.height = '100vh'
        iframe.style.position = 'fixed'
        iframe.style.zIndex = MAX_Z_INDEX
        iframe.style.left = 0
        iframe.style.top = 0
        iframe.style.margin = 0
        iframe.style.padding = 0
    }

    else {
        iframe.style.width = initialWidth + 'px'
        iframe.style.height = initialHeight + 'px'
        iframe.style.position = 'relative'
    }
    
}

function onResponse(resp) {
    console.log('Content script', resp);
}

function onError(error) {
    console.error(`Extension Tabblock Error: ${error}`);
}