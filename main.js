const path = require('path');
const { app, BrowserWindow } = require('electron');

/**
 * Create a window, load preload.js and open index.html.
 */
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nativeWindowOpen: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);
