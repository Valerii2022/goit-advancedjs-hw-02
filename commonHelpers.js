import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",r);t.stopBtn.addEventListener("click",a);let e;function o(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}function r(){t.startBtn.disabled=!0,t.stopBtn.disabled=!1,e=setInterval(()=>{const n=o();t.body.style.backgroundColor=n},1e3)}function a(){clearInterval(e),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}
//# sourceMappingURL=commonHelpers.js.map