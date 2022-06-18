'use strict'

var gStartPos
var gCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initEditMeme() {
    gCanvas = document.querySelector('.my-canvas')
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    setFirstLine(gCanvas)
    addListeners()
    renderEmojies()
    renderMeme()
}

function openMemeEditor() {
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.main-meme').style.display = 'flex'
    document.querySelector('.my-memes').style.display = 'none'
    // setCanvas(gCanvas)
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
        // renderCanvas()
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
    if (!isTextClicked(pos, gCanvas)) {
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
    // document.body.style.cursor = 'grab'
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
    setLineTxt(txt)
    renderMeme()
}

function drawText(currLine) {
    const text = currLine.txt
    // const txtLength = gCtx.measureText(text).width
    // if(txtLength >= gCanvas.width - 60){

    // }

    const align = currLine.align
    // let x
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
    const y = currLine.pos.y
    const x = currLine.pos.x

    gCtx.lineWidth = 2
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.color
    gCtx.font = `${currLine.size}px Impact`
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    if (currLine.isSelected) renderSelectBorder(currLine)
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
    // renderSelectBorder()
}

function onChangFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onChangTextAlign(pos) {
    changTextAlign(pos, gCanvas)
    renderMeme()
}

function onSetColor(color, isFill) {
    setColor(color, isFill)
    renderMeme()
}

function onUploadImg() {
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
    openMyMemes()
}

//     const txtLength = gCtx.measureText(text).width

function renderSelectBorder(line) {
    const y = line.pos.y - line.size - 10
    const x = line.pos.x - gCanvas.width / 2 + 20
    // const x = 20
    const z = line.size + 30
    drawRect(x, y, z)
}

function drawRect(x, y, z) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.rect(x, y, gCanvas.width - 40, z)
    // gCtx.rect(x, y, gCanvas.width - x*2, z)
    gCtx.fillStyle = '#00000000'
    gCtx.fillRect(x, y, gCanvas.width - 40, z)
    // gCtx.fillRect(x, y, gCanvas.width - x*2, z)
    gCtx.strokeStyle = '#8a8a8a'
    gCtx.stroke()
}

function toggleModal() {
    document.querySelector('.modal').classList.toggle('open-modal')
    document.body.classList.toggle('open-modal')
}
