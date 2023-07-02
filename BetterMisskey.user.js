// ==UserScript==
// @name         Better Misskey
// @namespace    http://tampermonkey.net/
// @version      0.2.0
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

let articleClick = true; //ノートクリックでTwitterのように拡大表示できるようにする
let followIconClick = true; //フォロー・フォロワー一覧でアイコンクリックだけでプロフィール表示できるようにする
let rnUseQuote = true; //RNを引用RNを使ったものにする

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
    observer.disconnect();
    if(articleClick){
        let icons = document.querySelectorAll(`[tabindex="-1"] > :is(article,div) [href^="/@"][title]:not(.misskeyKaonasi)`)
    for(let elem of icons){
        if(elem.parentElement.querySelector(`header [href^="/notes/"]`) != null) elem.parentElement.onclick = eventClick
        elem.classList.add("misskeyKaonasi")
    }
    }
    if(followIconClick && location.host != "submarin.online"){
      let followIcons = document.querySelectorAll(":is(.avatar,span[title]):not(.misskeyKaonasi):not(a > *)")
      for(let elem of followIcons){
      elem.onclick = avatarClick
        elem.classList.add("misskeyKaonasi")
      }
    }
    if(rnUseQuote){
      let rnIcon = document.querySelectorAll(`[role="menuitem"][tabindex="0"]:not(.misskeyKaonasi) > .ti-fw.xh8pZ.ti.ti-repeat`)
      for(let elem of rnIcon){
          let base = elem.parentElement.parentElement
          elem.parentElement.outerHTML = elem.parentElement.outerHTML
          base.children[0].classList.add("misskeyKaonasi")
          base.children[0].addEventListener(
              'click',
              rnClick,
              true
          )
      }
    }
    observer.observe(document.querySelector("#misskey_app,#app"),{childList: true,subtree: true})
}
function eventClick(event){
    if(event.target.tagName == "ARTICLE" || event.target.tagName == "DIV" || event.target.tagName == "FOOTER" || event.target.tagName == "HEADER"){
        event.currentTarget.parentElement.querySelector(`header [href^="/notes/"]`).click()
    }
    event.stopPropagation()
}

function eventCancel(event){
    event.stopPropagation()
}

function avatarClick(event){
(event.currentTarget.parentElement.querySelector("a.name") ?? event.currentTarget.parentElement.querySelector(`a[href^="/@"]`))?.click()
}

function rnClick(event){
  event.currentTarget.nextElementSibling.click()
    window.setTimeout(() => document.querySelector(`[data-cy-open-post-form-submit=""]`).click(),100)
  event.stopPropagation()
    event.stopImmediatePropagation()
    event.preventDefault()
}
(function() {
    'use strict';
    setObs()
    // Your code here...
})();
