'use strict'

const KEY = 'memesDB'
var gMyMemes = []
var gMeme
var gEmojies = {emojies: ['😀', '😂', '🤣', '😅', '😕', '😨', '😓', '🤯', '😱'] , currIdx: 0}

function createNewMeme(){
    gMeme = {
        url: '',
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{ txt: 'Meme', size: 40, font: 'Impact', align: 'c', strokeColor: 'black', color: 'white', pos : {y: 80, x: 0}, isSelected: false, isDrag: false}],
    }
}

function createRandMeme(){
    createNewMeme()
    const imgs = getImages()
    setCurrImage(getRandomIntInclusive(0, imgs.length - 1))

    const line = gMeme.lines[0]
    line.txt = getMemeSentence()
    line.size = getRandomIntInclusive(20, 60)
    line.color = getRandomColor()

} 

function setCurrImage(imgIdx) {
    gMeme.selectedImgId = imgIdx
}

function setMemeForEdit(idx){
    gMeme = gMyMemes[idx]
}

function setFirstLine(canvas){
    // check if this is the first line on init
    if(!gMeme.url) gMeme.lines[0].pos.x = canvas.width / 2
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getMeme() {
    return gMeme
}

function getCurrLine() {
    return _getCurrLine()
}

function moveLine(dx, dy) {
    const line = _getCurrLine()
    line.pos.x += dx
    line.pos.y += dy
}

function getEmojies(){
    var emojies = gEmojies.emojies
    const startIdx = gEmojies.currIdx * 3
	emojies = emojies.slice(startIdx, startIdx + 3)
    return emojies
}

function slideEmojies(isNext) {
	if (isNext) gEmojies.currIdx++
	else gEmojies.currIdx--

    if (gEmojies.currIdx * 3 >= gEmojies.emojies.length ) gEmojies.currIdx = 0
    else if (gEmojies.currIdx < 0) gEmojies.currIdx = gEmojies.emojies.length/3 - 1
}

function moveText(direc){
    const line = _getCurrLine()
    if(direc === 'up') line.pos.y -= 20
    else line.pos.y += 20
}

function addLine(canvas, txt = 'Meme', isEmojy = false) {
    const newLine = { txt, size: 40, font: 'Impact', align: 'c', strokeColor: 'black', color: 'white', pos:{y: 80, x: 0}, isDrag: false}
    if(!gMeme.lines.length) newLine.pos.y = 80
    if(gMeme.lines.length === 1) newLine.pos.y = canvas.height - 80 + newLine.size
    else newLine.pos.y = canvas.height/2 + newLine.size/2

    if(isEmojy) newLine.pos.y = canvas.height/2 + newLine.size/2
    newLine.pos.x = canvas.width/2
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
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

function setFontSize(diff){
    const line = _getCurrLine()
    line.size += diff
}

function setFont(font){
    const line = _getCurrLine()
    line.font = font
}

function setColor(color, isFill){
    const line = _getCurrLine()
    if(isFill) line.color = color
    else line.strokeColor = color
}

function setTextAlign(pos, canvas) {
    const line = _getCurrLine()
    line.align = pos
    updatePos(line, pos, canvas)
}

function updatePos(line, pos, canvas){
    if(pos === 'c') line.pos.x = canvas.width / 2
    if(pos === 'l') line.pos.x = 30
    if(pos === 'r') line.pos.x = canvas.width - 30  
}

function updateSelection(isSelected){
    gMeme.lines.forEach((line => line.isSelected = false))
    const line = _getCurrLine()
    line.isSelected = isSelected
}

function isLineClicked(clickedPos, canvas) {
    const lineIdx = gMeme.lines.findIndex(line =>{
        const y = line.pos.y - line.size - 10
        const x = 20
        const z = line.size + 30
        
        return (clickedPos.x > x && clickedPos.x < x + (canvas.width - x*2) &&
        clickedPos.y > y && clickedPos.y < y + z)  
    })
    if(lineIdx === -1) return false
    gMeme.selectedLineIdx = lineIdx
    updateSelection(true)
    return true
}

function saveMeme(url){
    gMeme.url = url
    const isSaved = gMyMemes.find(meme => meme.url === gMeme.url)
    if(!isSaved) gMyMemes.push(gMeme)
    _saveMemesToStorage()
}

function setLineDrag(isDrag) {
    const line = _getCurrLine()
    line.isDrag = isDrag
}

function loadMyMemes(){
    const memes = loadFromStorage(KEY)
    if(memes) gMyMemes = memes
}

function getSavedMemes(){
    const memes = loadFromStorage(KEY)
    return memes
}

function _getCurrLine(){
    return gMeme.lines[gMeme.selectedLineIdx] 
}

function _saveMemesToStorage() {
	saveToStorage(KEY, gMyMemes)
}
