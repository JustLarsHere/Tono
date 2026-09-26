const { invoke } = window.__TAURI__.core;
import Split from 'split.js'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';





window.addEventListener("DOMContentLoaded", () => {
  // resizable sidebar
  // TODO: Consider coding this ourselves for a smoother experience
  let split = Split(['nav', 'main'], {
    sizes: [20, 80],
    minSize: [250, 300], //250
    gutterSize: 10,
    snapOffset: 0,
    dragInterval: 0
  });

  tippy('#test', {
    content: 'Hello!',
    duration: 0,
    arrow: false,
    delay: [1000, 200],
  });
});
document.addEventListener("contextmenu", e => e.preventDefault());
