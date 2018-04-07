import Vue from 'vue';
import App from './App';
import $ from 'jquery';
require('bootstrap');

window.$ = $;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
const vue = new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')

import  {remote} from 'electron';
const { Menu, MenuItem, dialog } = remote;

const template = [
    {
        label: 'File',
        submenu: [
            { label: 'Opciones...' },
            { type: 'separator' },
            { label: 'Close Tab', accelerator: 'CmdOrCtrl+W' },
            { label: 'Close All Tab' },
            { type: 'separator' },
            { role: 'quit', accelerator: 'CmdOrCtrl+Q' },
        ]
    },{
        label: 'Level',
        submenu: [
            { label: 'New Level', click(item, focusedWindow) {
                if (focusedWindow) {
                    debugger; 
                    vue.$children[0].newLevel();
                    }
            }},
            { label: 'Open Level...', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].openLevel();
            }},
            { type: 'separator' },
            { label: 'Save', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].saveLevel();
            }},
            { label: 'Save as...', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].saveLevelAs();
            }},
            { type: 'separator' },
            { label: 'Export JSON...', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].exportJSONAs();
            } },
            { label: 'Export PNG...', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].exportPNG();
            } },
            { type: 'separator' },
            { label: 'Options...' }
        ]
    },{
        label: 'Tileset',
        submenu: [
            { label: 'New Tileset', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].$refs.tilesetBar.newTileset();
            }},
            { label: 'Open Tileset...', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].$refs.tilesetBar.openTileset();
            }},
            { type: 'separator' },
            { label: 'Save', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].$refs.tilesetBar.saveTileset();
            }},
            { label: 'Save as...', click(item, focusedWindow) {
                if (focusedWindow) vue.$children[0].$refs.tilesetBar.saveTilesetAs();
            }}
        ]
    },{
        label: 'View',
        submenu: [
            { label: 'Toggle Grid', accelerator: 'CmdOrCtrl+G', click(item, focusedWindow) {
                if (focusedWindow) {
                    vue.$emit('toggle-grid');
                }
            }},
            { type: 'separator' },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload();
                }
            },
            { role: 'togglefullscreen' },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            }
        ]
    },{
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo', accelerator: 'CmdOrCtrl+Y' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { type: 'separator' },
            { role: 'delete', accelerator: 'Supr' },
        ]
    },{
        label: 'Selection',
        submenu: [
            { role: 'selectall' },
            { label: 'Invert' },
        ]
    },{
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternal('http://electron.atom.io'); }
            },
        ]
    }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
