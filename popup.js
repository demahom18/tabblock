const checkbox = document.querySelector('.checkbox')

chrome.storage.sync.get('isEnabled').then(data => {
    checkbox.checked = data.isEnabled
})

checkbox.addEventListener('change', onCheckboxChange)

function onCheckboxChange() {
    chrome.storage.sync.set({ isEnabled: checkbox.checked })
}
