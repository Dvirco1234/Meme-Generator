'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'Meme', size: 40, align: 'c', color: 'white', pos : {y: 80, x:0}, isSelected: false,}],
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
    if(line.pos.y < 0) line.pos.y = 0
        // || line.pos.y > canvas.height) return
    if(direc === 'up') line.pos.y -= 20
    else line.pos.y += 20
}

function addLine(canvas) {
    const newLine = { txt: 'Meme', size: 40, align: 'c', color: 'white', pos:{y: 80, x:0}}
    if(!gMeme.lines.length) newLine.pos.y = 80
    if(gMeme.lines.length === 1) newLine.pos.y = canvas.height - 80 + newLine.size
    else newLine.pos.y = canvas.height/2 + newLine.size/2

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
    const line = _getCurrLine()
    line.align = pos

    
}

function updateSelection(){
    gMeme.lines.forEach((line => line.isSelected = false))
    const line = _getCurrLine()
    line.isSelected = true
}

function isTextClicked(clickedPos) {
    const { pos } = gCircle
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    return distance <= gCircle.size
}


function _getCurrLine(){
    return gMeme.lines[gMeme.selectedLineIdx] 
}

// function getTextAlign() {
//     return gMeme.lines[gMeme.selectedLineIdx].align
// }