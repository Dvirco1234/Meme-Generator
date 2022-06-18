'use strict'

const IMGS_KEY = 'imgsDB'
var gImgs = []
var gFilterTxt = ''
// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 3}

// createImages()
gImgs = [
    {id: 0, url: `img/0.jpg`, keyWords: ['movie', 'nerd']},
    {id: 1, url: `img/1.jpg`, keyWords: ['funny', 'nerd', 'politician']},
    {id: 2, url: `img/2.jpg`, keyWords: ['cute', 'dog']},
    {id: 3, url: `img/3.jpg`, keyWords: ['baby', 'dog', 'cute']},
    {id: 4, url: `img/4.jpg`, keyWords: ['cat', 'cute']},
    {id: 5, url: `img/5.jpg`, keyWords: ['baby', 'funny']},
    {id: 6, url: `img/6.jpg`, keyWords: ['movie', 'explain', 'funny']},
    {id: 7, url: `img/7.jpg`, keyWords: ['baby', 'funny']},
    {id: 8, url: `img/8.jpg`, keyWords: ['movie', 'funny']},
    {id: 9, url: `img/9.jpg`, keyWords: ['baby', 'funny', 'cute']},
    {id: 10, url: `img/10.jpg`, keyWords: ['funny', 'politician']},
    {id: 11, url: `img/11.jpg`, keyWords: ['funny', 'strange']},
    {id: 12, url: `img/12.jpg`, keyWords: ['movie', 'nerd']},
    {id: 13, url: `img/13.jpg`, keyWords: ['movie', 'funny']},
    {id: 14, url: `img/14.jpg`, keyWords: ['movie', 'badass']},
    {id: 15, url: `img/15.jpg`, keyWords: ['movie', 'explain']},
    {id: 16, url: `img/16.jpg`, keyWords: ['movie', 'nerd']},
    {id: 17, url: `img/17.jpg`, keyWords: ['explain', 'politician']},
]

function loadMyImgs(){
    const imgs = loadFromStorage(IMGS_KEY)
    if(imgs) gImgs = imgs
}

function getImages(){
    return gImgs
}
function getImagesForDisplay(){
    var imgs = gImgs
    if(gFilterTxt) imgs = imgs.filter((img) => img.keyWords.join('').includes(gFilterTxt))
    return imgs
}

function getImgByIdx(imgIdx){
    return gImgs[imgIdx]
}

function setFilter(txt){
    if (txt !== undefined) gFilterTxt = txt
    return gFilterTxt
}

function addImgToGallery(img) {
    const url = img.src
    const id = gImgs.length
    const image = {id, url, keyWords: ['my pictures']}
    gImgs.push(image)
    // _saveImgsToStorage()
    renderGallery()
}

function scaleToFit(img){
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function _saveImgsToStorage() {
	saveToStorage(IMGS_KEY, gImgs)
}

// function createImages(){
//     // var image = {}
//     for(var i = 0; i < 18; i++){
//         const image = {
//             id: i,
//             url: `img/${i}.jpg`,
//         }
//         gImgs.push(image)
//     }
// }