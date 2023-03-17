// ==UserScript==
// @name         Better Misskey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  matchにお好みのMisskeyインスタンスを入力してください
// @author       kaonasi_biwa
// @match        https://mi.ablaze.one/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=misskey.io
// @grant        none
// ==/UserScript==

let observer = new MutationObserver(observerFunc)
const setObs = ()=>{
    if(document.querySelector("#misskey_app")){
        observer.observe(document.querySelector("#misskey_app"),{childList: true,subtree: true})
    }
    else{
        window.setTimeout(setObs,1000)
    }
}

function observerFunc(){
    let icons = document.querySelectorAll(`[tabindex="-1"] > :is(article,div) [href^="/@"][title]:not(.misskeyKaonasi)`)
    for(let elem of icons){
        if(elem.parentElement.querySelector(`header [href^="/notes/"]`) != null) elem.parentElement.onclick = eventClick
        elem.classList.add("misskeyKaonasi")
    }
}
function eventClick(event){
    if(event.target.tagName != "IMG" && event.target.parentElement.tagName != "BUTTON"){
              event.currentTarget.parentElement.querySelector(`header [href^="/notes/"]`).click()

    }event.stopPropagation()

}

(function() {
    'use strict';
    setObs()
    // Your code here...
})();
