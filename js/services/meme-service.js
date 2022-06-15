'use strict'

var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [
{ txt: 'I sometimes eat Falafel',size: 20, align: 'left', color: 'red' } ] }

var gCurrTextAlign = 'c'

function getMeme(){
    return gMeme
}

function getTextAlign(){
    return gCurrTextAlign
}

function changTextAlign(pos) {
    gCurrTextAlign = pos
}
