const { invoke } = window.__TAURI__.core;
import Split from 'split.js'
let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  // using ES6 modules


  Split(['nav', 'main'], {
    sizes: [20, 80],
    minSize: [250, 300], //250
    gutterSize: 4,
    snapOffset: 0,
    dragInterval: 0
  });
});
