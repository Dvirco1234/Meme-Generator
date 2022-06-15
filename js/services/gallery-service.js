'use strict'

var gImgs = []

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