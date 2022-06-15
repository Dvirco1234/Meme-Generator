'use strict'

var gCanvas
var gCtx
var gCurrLine = 1

function initCreateMeme() {
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
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
    const txtLength = gCtx.measureText(text).width
    const align = currLine.align
    var x 
    switch (align) {
        case 'c':
            x = gCanvas.width / 2 - txtLength / 2
            break
        case 'l':
            x = 20
            break
        case 'r':
            x = gCanvas.width - 20 - txtLength 
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
// function drawText(text) {
//     const txtLength = gCtx.measureText(text).width
//     const meme = getMeme()
//     // const pos = getTextAlign()
//     var x 
//     // var x = findPos(pos)
//     switch (pos) {
//         case 'c':
//             x = gCanvas.width / 2 - txtLength / 2
//             break
//         case 'l':
//             x = 20
//             break
//         case 'r':
//             x = gCanvas.width - 20 - txtLength 
//             break
//     }
// gCtx.textAlign = 'center'
// gCtx.textAlign = 'start'
// gCtx.textAlign = 'end'


//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = 'black'
//     gCtx.fillStyle = 'white'
//     gCtx.font = '40px Impact'
//     gCtx.fillText(text, x, 80)
//     gCtx.strokeText(text, x, 80)
// }

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

