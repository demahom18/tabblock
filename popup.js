const checkbox = document.querySelector('.checkbox')
const videosBtn = document.querySelector('.videos button')

chrome.storage.sync.get('isEnabled').then(data => {
    checkbox.checked = data.isEnabled
})

checkbox.addEventListener('change', onCheckboxChange)
videosBtn.addEventListener('click', playVideo)

function onCheckboxChange() {
    chrome.storage.sync.set({ isEnabled: checkbox.checked })
}

async function getVideo() {
    let _video = await chrome.storage.sync.get('video')

    if (!_video) {
        _video = { video: false }
    }

    return _video
}

function playVideo() {
    getVideo().then(data => {
        console.log(data);
        chrome.storage.sync.set({ video: !data.video })
    })
}