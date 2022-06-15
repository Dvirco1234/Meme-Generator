'use strict'

var gImgs = []
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

createImages()

function getImages(){
    return gImgs
}

function getImgByIdx(imgIdx){
    return gImgs[imgIdx]
}

function createImages(){
    // var image = {}
    for(var i = 0; i < 18; i++){
        const image = {
            id: i,
            url: `img/${i}.jpg`,
        }
        gImgs.push(image)
    }
}