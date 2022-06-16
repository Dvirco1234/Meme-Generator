'use strict'

var gMeme = {
    isSelected: false,
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'Meme', size: 40, align: 'c', color: 'white', posY: 80}],
}

// var gCurrImgIdx
// var gCurrTextAlign = 'c'

function setCurrImage(imgIdx) {
    gMeme.selectedImgId = imgIdx
    // gCurrImgIdx = getImgByIdx(imgIdx)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getCurrLine() {
    return _getCurrLine()
}

function moveText(direc, canvas){
    const line = _getCurrLine()
    if(line.posY < 0) line.posY = 0
        // || line.posY > canvas.height) return
    if(direc === 'up') line.posY -= 20
    else line.posY += 20
}

function addLine(canvas) {
    const newLine = { txt: 'Meme', size: 40, align: 'c', color: 'white', posY: 80 }
    if(!gMeme.lines.length) newLine.posY = 80
    if(gMeme.lines.length === 1) newLine.posY = canvas.height - 80
    else newLine.posY = canvas.height/2 + newLine.size/2

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    // console.log(gMeme.lines);
}

function deleteLine(canvas){
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if(!gMeme.lines.length) addLine(canvas)
    selectNextLine()
}

function selectNextLine(){
    if(gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function changeFontSize(diff){
    const line = _getCurrLine()
    line.size += diff
    console.log(line.size);
}

function setColor(color){
    const line = _getCurrLine()
    line.color = color
}

function getMeme() {
    return gMeme
}

function changTextAlign(pos) {
    gMeme.lines[gMeme.selectedLineIdx].align = pos
}

function updateSelection(){
    gMeme.isSelected = true
}

function _getCurrLine(){
    return gMeme.lines[gMeme.selectedLineIdx] 
}

// function getTextAlign() {
//     return gMeme.lines[gMeme.selectedLineIdx].align
// }