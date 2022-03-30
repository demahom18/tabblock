chrome.storage.sync.get('isEnabled').then((data) => {
    enableBlock(data.isEnabled)
})

chrome.storage.onChanged.addListener(onStorageChange)
chrome.runtime.onMessage.addListener(onReceivedMessage);

function onReceivedMessage(request, sender, sendResponse) {
    enableBlock(request.block)
    sendResponse({});
}
  
function onStorageChange (state) {
    isEnabled = state.isEnabled.newValue
    
    enableBlock(isEnabled)
}

function enableBlock(isEnabled) {
    if (isEnabled) {
        chrome.tabs.onCreated.addListener(block)
    }
    else {
        chrome.tabs.onCreated.removeListener(block)
    }
}

function block({ id }) {
    setTimeout(() => {
        chrome.tabs.remove([id])
    }, 100) 
}

// async function getCurrentTab() {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }
