'use strict'

var gCanvas
var gCtx
var gCurrLine = 1

function initCreateMeme() {
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
    renderMeme()
}

function renderMeme(){
    const meme = getMeme()
    renderImg(meme.selectedImgId)
    renderLines(meme)
    // if(meme.isSelected) renderSelectBorder()
}

function renderImg(i) {
    const elImg = document.querySelector(`.image${i}`)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function renderLines(meme){
    const lines = meme.lines
    lines.forEach(line => {
        drawText(line)
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth - 50
    gCanvas.height = elContainer.offsetHeight 
}

function onEnterText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function drawText(currLine) {
    const text = currLine.txt
    // const txtLength = gCtx.measureText(text).width
    const align = currLine.align
    let x 
    switch (align) {
        case 'c':
            x = gCanvas.width / 2
            gCtx.textAlign = 'center'
            break
        case 'l':
            x = 20
            gCtx.textAlign = 'start'
            break
        case 'r':
            x = gCanvas.width - 20 
            gCtx.textAlign = 'end'
            break
    }
    const y = currLine.posY

    

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = currLine.color
    gCtx.font = `${currLine.size}px Impact`
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onMoveText(direc){
    moveText(direc, gCanvas)
    renderMeme()
}

function onAddLine() {
    addLine(gCanvas)
    renderMeme()
    document.querySelector('.meme-input').value = ''
}
function onDeleteLine() {
    deleteLine(gCanvas)
    renderMeme()
    document.querySelector('.meme-input').value = ''
}

function onSelectNextLine(){
    selectNextLine()
    const line = getCurrLine()
    document.querySelector('.meme-input').value = line.txt
    updateSelection()
    // renderMeme()
    // renderSelectBorder()
}

function onChangFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onChangTextAlign(pos) {
    changTextAlign(pos)
    renderMeme()
}

function onSetColor(color){
    setColor(color)
    renderMeme()
}

//     const txtLength = gCtx.measureText(text).width

// function renderSelectBorder(){
//     const line = getCurrLine()
//     const y = line.posY + line.size + 10
//     const x = 30
//     const z = line.size + 20
//     // drawRect(x,y,z)
//     drawRect()
// }

// function drawRect(x, y, z) { 
// function drawRect() { 
//     gCtx.beginPath() 
//     gCtx.lineWidth = 2
//     gCtx.rect(25, 25, 100, 100)  
//     gCtx.fillStyle = '#00000000'
//     gCtx.fillRect(25, 25, 100, 100)
//     // gCtx.fillRect(x, y, gCanvas.width - x*2, z)
//     gCtx.strokeStyle = 'black'
//     gCtx.stroke()
// }

