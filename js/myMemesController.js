'use strict'

function openMyMemes(){
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.main-meme').style.display = 'none'
    document.querySelector('.my-memes').style.display = 'flex'
    renderSavedMemes()

    document.body.classList.remove('menu-open')
}

function renderSavedMemes(){
    const memes = getSavedMemes()
    // const elImg = document.querySelector(`.image${i}`)
    console.log(memes);
    var strHTML = ''

    memes.map((meme, i) => {
        // strHTML += `<img class="image${i}" src="${meme.url}">`
        strHTML += `<artice class="image" onclick="onMemeSelect(${i})"><img class="image${i}" src="${meme.url}"></artice>`
    })
    document.querySelector('.memes-imgs').innerHTML = strHTML
}

function onMemeSelect(idx){
    setMemeForEdit(idx)
    openMemeEditor()
    initEditMeme()
}
