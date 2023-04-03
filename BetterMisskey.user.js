// ==UserScript==
// @name         Better Misskey
// @namespace    http://tampermonkey.net/
// @version      0.1.10
// @description  include等にお好みのMisskeyインスタンスを入力して利用してください
// @author       kaonasi_biwa
// @homepage     https://github.com/kaonasi-biwa/BetterMisskeyTampermonkey
// @icon         https://www.google.com/s2/favicons?sz=64&domain=misskey.io
// @updateURL    https://github.com/kaonasi-biwa/BetterMisskeyTampermonkey/releases/latest/download/BetterMisskey.user.js
// @downloadURL  https://github.com/kaonasi-biwa/BetterMisskeyTampermonkey/releases/latest/download/BetterMisskey.user.js
// @grant        none
// @match        *://mi.ablaze.one/*
// @match        *://misskey.io/*
// @match        *://misskey.04.si/*
// @match        *://ktnfm.com/*
// @match        *://otoya.space/*
// @match        *://misskey.sda1.net/*
// @match        *://blog.ablaze.one/*
// @match        *://misskey.dev/*
// @match        *://submarin.online/*
// ==/UserScript==


let observer = new MutationObserver(observerFunc)
const setObs = ()=>{
    if(document.querySelector("#misskey_app,#app")){
        observer.observe(document.querySelector("#misskey_app,#app"),{childList: true,subtree: true})
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
    let artciclesAtags = document.querySelectorAll(`article header+div a:not(.misskeyKaonasi)`)
    for(let elem of icons){
        elem.parentElement.onclick = eventClickCancel
        elem.classList.add("misskeyKaonasi")
    }
    if(location.host != "submarin.online"){
      let followIcons = document.querySelectorAll(".avatar:not(.misskeyKaonasi):not(a > *)")
      for(let elem of followIcons){
      elem.onclick = avatarClick
        elem.classList.add("misskeyKaonasi")
      }
    }
}
function eventClick(event){
    console.log(event.target.tagName)
    if(event.target.tagName == "ARTICLE" || event.target.tagName == "DIV" || event.target.tagName == "FOOTER" || event.target.tagName == "HEADER"){
        event.currentTarget.parentElement.querySelector(`header [href^="/notes/"]`).click()
    }
    event.stopPropagation()
}

function eventCancel(event){
    event.stopPropagation()
}

function avatarClick(event){
event.currentTarget.parentElement.querySelector("a.name")?.click()
}

(function() {
    'use strict';
    setObs()
    // Your code here...
})();
