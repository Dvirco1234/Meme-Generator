'use strict'

var gCanvas
var gCtx
var gCurrLine = 1

function onInit() {
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    console.log(gCtx)
    renderGallery()
    resizeCanvas()
}

function renderGallery() {
    const imgs = getImages()
    const strHTMLs = imgs.map(
        (img, i) =>
            `<artice class="image" onclick="onOpenImg(${i})"><img class="image${i}" src="${img.url}"></artice>`
    )
    document.querySelector('.main-gallery').innerHTML = strHTMLs.join('')
}

function onOpenImg(imgIdx) {
    // const img = getImgByIdx(imgIdx)
    renderImg(imgIdx)
    document.querySelector('.main-gallery').style.display = 'none'
}

// MEME EDITOR

function renderImg(i) {
    // const img = `<img src="${url}">`
    const elImg = document.querySelector(`.image${i}`)
    console.log(i)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function renderCanvas(){

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth - 50
    gCanvas.height = elContainer.offsetHeight - 50
}



function onEnterText(txt) {
    drawText(txt)
}

function drawText(text) {
    const txtLength = gCtx.measureText(text).width
    const pos = getTextAlign()
    var x
    switch (pos) {
        case 'c':
            x = gCanvas.width / 2 - txtLength / 2
            break
        case 'l':
            x = 20
            break
        case 'r':
            x = gCanvas.width - 20 - txtLength / 2
            break
    }

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.fillText(text, x, 80)
    gCtx.strokeText(text, x, 80)
}

function onChangFontSize(x) {}

function onChangTextAlign(pos) {
    changTextAlign(pos)
}

changTextPos(pos)