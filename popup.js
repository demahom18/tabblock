const checkbox = document.querySelector('.checkbox')
const Storage = chrome.storage.sync

Storage.get('isEnabled').then(data => {
    checkbox.checked = data.isEnabled
})

checkbox.addEventListener('change', onCheckboxChange)

function onCheckboxChange() {
    Storage.set({ isEnabled: checkbox.checked })
}
