import Split from 'split.js'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { getSystemFonts } from "tauri-plugin-system-fonts-api";
import {readTextFile, readDir, mkdir, BaseDirectory, readFile} from '@tauri-apps/plugin-fs';

const PLUGIN_FOLDER = 'Tono/plugins/js/';
const META_FILE_NAME = 'meta.json';
const JS_FILE_NAME = 'plugin.js';

// Create the plugin folder
await mkdir(PLUGIN_FOLDER, {
  baseDir: BaseDirectory.AppData,
  recursive: true,
});




async function getPlugins (PLUGIN_FOLDER, META_FILE_NAME, JS_FILE_NAME) {
  const plugin_folders = await readDir(PLUGIN_FOLDER, { baseDir: BaseDirectory.AppData });
  let plugins = []
// go through all plugin folders
  for (const plugin_folder of plugin_folders) {
    // filter out files
    if (plugin_folder.isDirectory) {
      // go through all plugin files
      const plugin_files = await readDir(PLUGIN_FOLDER+plugin_folder.name, { baseDir: BaseDirectory.AppData });
      let current_plugin = {};
      for (const file of plugin_files) {
        // find meta file
        if (file.isFile && file.name.toLowerCase() === META_FILE_NAME) {
          const meta_file = await readFile(PLUGIN_FOLDER+plugin_folder.name+"/"+META_FILE_NAME, { baseDir: BaseDirectory.AppData });
          const meta_content = new TextDecoder().decode(meta_file);
          // Attempt to parse the json
          let meta_json;
          try {
            meta_json = JSON.parse(meta_content);
            if (!['js'].includes(meta_json.language)) break;
            current_plugin.meta = meta_json;
          } catch (e) {
            break;
          }
        }
        if (file.isFile && file.name.toLowerCase() === JS_FILE_NAME) {
          const js_file = await readFile(PLUGIN_FOLDER+plugin_folder.name+"/"+JS_FILE_NAME, { baseDir: BaseDirectory.AppData });
          current_plugin.js =  new TextDecoder().decode(js_file);
          plugins.push(current_plugin);
          break;
        }
      }
    }
  }
  return plugins;
}

function getPlugin(name) {

}
console.log(await getPlugins(PLUGIN_FOLDER, META_FILE_NAME, JS_FILE_NAME));


// If tauri loads the document before script
if (document.readyState === 'complete') init()
window.addEventListener("DOMContentLoaded", () => {
  init()

});

function init() {

  let split = Split(['nav', 'main'], {
    sizes: [20, 80],
    minSize: [250, 300],
    gutterSize: 10,
    snapOffset: 0,
    dragInterval: 0
  });

}

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});



/*
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


const result = await invoke("to_rust", {
  message: "hello :)"
});
await listen("rust-message", (event) => {
  console.log(event.payload);
});*/