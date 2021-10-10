const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const LedgerMenu = require('./js/menu.js');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nativeWindowOpen: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'js', 'preload.js'),
        }
    });

    win.maximize();
    win.show();

    win.loadFile(path.join(__dirname, 'index.html'));
    Menu.setApplicationMenu(LedgerMenu.getInstance());
}

app.on('ready', createWindow);
