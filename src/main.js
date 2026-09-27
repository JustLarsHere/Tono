const { invoke } = window.__TAURI__.core;
import Split from 'split.js'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';



let instance;

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

  instance=tippy('#test', {
    content: 'test',
    duration: 0,
    arrow: true,
    delay: [1000, 200],
    placement: 'bottom',
    interactive: true,
    appendTo: () => document.body
  });
});
document.addEventListener("contextmenu", e => {
  e.preventDefault();
  instance?.show();
});
import { getSystemFonts } from "tauri-plugin-system-fonts-api";

async function loadFonts() {
  try {
    // Returns an array of strings containing font names
    const fonts = await getSystemFonts();
    console.log("Installed fonts:");
    for (const font of fonts) {
    }
  } catch (error) {
    console.error("Failed to fetch system fonts:", error);
  }
}
loadFonts();

import { getCurrentWindow } from '@tauri-apps/api/window';


async function show() {
  const appWindow = getCurrentWindow();

  await appWindow.setDecorations(true);
}
async function hide() {
  const appWindow = getCurrentWindow();

  await appWindow.setDecorations(false);

}
window.show = show;
window.hide = hide;