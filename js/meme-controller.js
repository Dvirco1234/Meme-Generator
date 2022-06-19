'use strict'

var gStartPos
var gCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initEditMeme() {
    onDisplaySection('meme-edit')
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    setFirstLine(gCanvas)
    addListeners()
    renderEmojies()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    renderImg(meme.selectedImgId)
    renderLines(meme)
}

function renderImg(i) {
    const elImg = document.querySelector(`.image${i}`)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function renderLines(meme) {
    const lines = meme.lines
    lines.forEach((line) => {
        drawText(line)
    })
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
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

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos, gCanvas)) {
        updateSelection(false)
        renderMeme()
        return
    }
    setLineDrag(true)
    gStartPos = pos
    document.querySelector('.my-canvas').style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    const line = getCurrLine()    
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}

function onUp() {
    setLineDrag(false)
    document.querySelector('.my-canvas').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function renderEmojies() {
    const emojies = getEmojies()

    const strHTMLs = emojies.map(
        (emojy) =>
            `<div class="emojy" onclick="onEmojySelect('${emojy}')">${emojy}</div>`
    )
    document.querySelector('.emojies-container').innerHTML = strHTMLs.join('')
}

function onSlideEmojies(isNext) {
    slideEmojies(isNext)
    renderEmojies()
}

function onEmojySelect(emojy) {
    addLine(gCanvas, emojy, true)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function resizeCanvasContainer(idx) {
    const elContainer = document.querySelector('.canvas-container')
    const elImg = document.querySelector(`.image${idx}`)
    var realWidth = elImg.naturalWidth
    var realHeight = elImg.naturalHeight
    const height = (realHeight * gCanvas.width) / realWidth
    elContainer.style.height = height + 'px'
    resizeCanvas()
    scaleToFit(elImg)
}

function scaleToFit(img) {
    var scale = Math.min(gCanvas.width / img.width, gCanvas.height / img.height)
    var x = gCanvas.width / 2 - (img.width / 2) * scale
    var y = gCanvas.height / 2 - (img.height / 2) * scale
    gCtx.drawImage(img, x, y, img.width * scale, img.height * scale)
    renderMeme()
}

function onEnterText(txt) {
    const txtLength = gCtx.measureText(txt).width
    if(txtLength >= gCanvas.width - 60) return
    setLineTxt(txt)
    renderMeme()
}

function drawText(currLine) {
    const text = currLine.txt
    const align = currLine.align
    onAligntext(align)

    const y = currLine.pos.y
    const x = currLine.pos.x
    gCtx.lineWidth = 2
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.color
    gCtx.font = `${currLine.size}px ${currLine.font}`
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    if (currLine.isSelected) renderSelectBorder(currLine)
}

function onAligntext(align){
    switch (align) {
        case 'c':
            gCtx.textAlign = 'center'
            break
        case 'l':
            gCtx.textAlign = 'start'
            break
        case 'r':
            gCtx.textAlign = 'end'
            break
    }
}


function onMoveText(direc) {
    moveText(direc)
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

function onSelectNextLine() {
    selectNextLine()
    const line = getCurrLine()
    document.querySelector('.meme-input').value = line.txt
    updateSelection(true)
    renderMeme()
}

function onSetFont(font){
    setFont(font)
    renderMeme()
}

function onSetFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onSetTextAlign(pos) {
    setTextAlign(pos, gCanvas)
    renderMeme()
}

function onSetColor(color, isFill) {
    setColor(color, isFill)
    renderMeme()
}

function onUploadImg() {
    updateSelection(false)
    renderMeme()
    uploadImg()
}

function onDownloadMeme(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my canvas'
}

function onSaveMeme() {
    const data = gCanvas.toDataURL()
    saveMeme(data)
    onDisplaySection('my-memes')
    renderSavedMemes()
}

function renderSavedMemes(){
    const memes = getSavedMemes()
    var strHTML = ''

    memes.map((meme, i) => {
        strHTML += `<artice class="image" onclick="onMemeSelect(${i})"><img class="image${i}" src="${meme.url}"></artice>`
    })
    document.querySelector('.memes-imgs').innerHTML = strHTML
}

function onMemeSelect(idx){
    setMemeForEdit(idx)
    onDisplaySection('meme-edit')
    initEditMeme()
}


function renderSelectBorder(line) {
    const y = line.pos.y - line.size - 10
    const x = line.pos.x - gCanvas.width / 2 + 20
    const z = line.size + 30
    drawLineBorder(x, y, z)
}

function drawLineBorder(x, y, z) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.rect(x, y, gCanvas.width - 40, z)
    gCtx.fillStyle = '#00000000'
    gCtx.fillRect(x, y, gCanvas.width - 40, z)
    gCtx.strokeStyle = '#8a8a8a'
    gCtx.stroke()
}

function toggleModal() {
    document.querySelector('.modal').classList.toggle('open-modal')
    document.body.classList.toggle('open-modal')
}
