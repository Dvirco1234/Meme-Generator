'use strict'

// var gCanvas
// var gCtx
// var gCurrLine = 1

function onInit() {
    // gCanvas = document.querySelector('.my-canvas')
    // gCtx = gCanvas.getContext('2d')
    // console.log(gCtx)
    renderGallery()
    // resizeCanvas()
}

function renderGallery() {
    const imgs = getImages()
    const strHTMLs = imgs.map(
        (img, i) =>
            `<artice class="image" onclick="onImgSelect(${i})"><img class="image${i}" src="${img.url}"></artice>`
    )
    document.querySelector('.main-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgIdx) {
    // const img = getImgByIdx(imgIdx)
    // renderImg(imgIdx)
    setCurrImage(imgIdx)
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.main-meme').style.display = 'flex'
    initCreateMeme()
}
