const Storage = chrome.storage.sync

Storage.get('isEnabled').then((data) => {
    enableBlock(data.isEnabled)
})

chrome.storage.onChanged.addListener(onStorageChange)

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

// 
function block({ id }) {
    chrome.tabs.remove([id])
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}