'use strict'

function onInit() {
    onDisplaySection('main-gallery')
    renderKeyWords()
    renderGallery()
    loadMyMemes()
}

function renderGallery() {
    const imgs = getImagesForDisplay()
    const strHTMLs = imgs.map(
        (img, i) =>
            `<article class="image" onclick="onImgSelect(${i})"><img class="image${i}" src="${img.url}"></article>`
    )
    document.querySelector('.gallery-imgs').innerHTML = strHTMLs.join('')
}

function renderKeyWords() {
    const keyWords = getKeyWords()
    const strHTMLs = keyWords.map(
        (word, i) =>
            `<span onclick="onSearchKeyWord('${word}', this)">${word} </span>`
    )
    document.querySelector('.words-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgIdx) {
    createNewMeme()
    setCurrImage(imgIdx)
    initEditMeme()
    resizeCanvasContainer(imgIdx)
}

function onDisplaySection(section) {
    document.querySelectorAll('.main').forEach(el => el.classList.add('none'))
    document.querySelector(`.${section}`).classList.remove('none')
    document.body.classList.remove('menu-open')
}

function onFlexibleMeme(){
    createRandMeme()
    initEditMeme()
}

function onSetFilter(txt) {
    setFilter(txt)
	renderGallery()
}

function toggleMenu(){
    document.body.classList.toggle('menu-open')
}

function onSearchKeyWord(word, elSpan){
    setFilter(word)
    renderGallery()
    if(!word) return
    const style = window.getComputedStyle(elSpan, null).getPropertyValue('font-size');
    const fontSize = parseFloat(style);
    if(fontSize >= 50) return
    elSpan.style.fontSize = (fontSize + 2) + 'px'

}

function onImgInput(ev) {
    loadImageFromInput(ev, addImgToGallery)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = function (event) {
        var img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

