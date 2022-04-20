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
    let btn;

    iframe.addEventListener('fullscreenchange', e => console.log('Fullscreen change', e))
    iframe.addEventListener('fullscreenerror', e => console.log('Fullscreen error', e))
    
    console.log(state.video);

    if (!state.video) return
    
    if (state.video.newValue == true) {
        btn = addFullscreenBtnOnPage()

        btn.addEventListener('click', () => {
            iframe.requestFullscreen()
        })

        // const { width, height } = iframe.getBoundingClientRect()
        // initialWidth = width
        // initialHeight = height

        // iframe.style.width = '100vw'
        // iframe.style.height = '100vh'
        // iframe.style.position = 'fixed'
        // iframe.style.zIndex = MAX_Z_INDEX
        // iframe.style.left = 0
        // iframe.style.top = 0
        // iframe.style.margin = 0
        // iframe.style.padding = 0
        // document.body.style.overflow = 'hidden'
    }
    
    else {
        // iframe.style.width = initialWidth + 'px'
        // iframe.style.height = initialHeight + 'px'
        // iframe.style.position = 'relative'
        // document.body.style.overflow = "auto"
    }
    
}
const FULLSCREEN_BUTTON_ID = 'tb-fullscreen-button'
function addFullscreenBtnOnPage () {
    const button = document.createElement('button')
    button.id = FULLSCREEN_BUTTON_ID
    button.textContent = 'Fullscreen'
    button.style.position = 'fixed';
    button.style.boxShadow = '0 0 3px rgba(0, 0, 0, 0.3)'
    button.style.top = '100px'
    button.style.left = '50vw'
    button.style.zIndex = MAX_Z_INDEX
    button.style.border = '1px solid linear-gradient(45deg, #f72585, #560bad, #560bad)'
    button.style.background = 'linear-gradient(45deg, #f72585, #560bad, #560bad)'
    button.style.borderRadius = '6px'

    document.body.append(button)

    return button
}


function onResponse(resp) {
    console.log('Content script', resp);
}

function onError(error) {
    console.error(`Extension Tabblock Error: ${error}`);
}