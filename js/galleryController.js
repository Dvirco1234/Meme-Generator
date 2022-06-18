'use strict'

function onInit() {
    renderGallery()
    loadMyMemes()
}

function renderGallery() {
    const imgs = getImagesForDisplay()
    // const imgs = getImages()
    const strHTMLs = imgs.map(
        (img, i) =>
            `<artice class="image" onclick="onImgSelect(${i})"><img class="image${i}" src="${img.url}"></artice>`
    )
    document.querySelector('.gallery-imgs').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgIdx) {
    // const img = getImgByIdx(imgIdx)
    // renderImg(imgIdx)
    createNewMeme()
    setCurrImage(imgIdx)
    goToMemeEdit()
    resizeCanvasContainer(imgIdx)
}

function goToMemeEdit(){
    openMemeEditor()
    initEditMeme()
}

function openGallery(){
    document.querySelector('.main-gallery').style.display = 'block'
    document.querySelector('.main-meme').style.display = 'none'
    document.querySelector('.my-memes').style.display = 'none'

    document.body.classList.remove('menu-open')
}

function onFlexChoose(){
    createRandMeme()
    goToMemeEdit()
    // const linesCount = getRandomIntInclusive(1, 2)
    // if(linesCount === 2) addRandLine()
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
    elSpan.style.fontSize = (fontSize + 2) + 'px'

}

function onImgInput(ev) {
    loadImageFromInput(ev, addImgToGallery)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    //After we read the file
    reader.onload = function (event) {
        var img = new Image()// Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // const url = event.target.result
        //Run the callBack func , To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // console.log(img);
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

