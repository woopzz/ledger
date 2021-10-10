const path = require('path');
const { app, ipcMain, dialog, BrowserWindow, Menu } = require('electron');
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

ipcMain.on('run-open-csv-file-dialog', function (ev) {
    const files = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{ name: 'CSV', extensions: ['csv'] }]
    });

    if (files) ev.sender.send('open-csv-files', files);
});

ipcMain.on('run-save-csv-file-dialog', function (ev) {
    const file = dialog.showSaveDialogSync({
        'defaultPath': 'payments.csv'
    });

    if (file) ev.sender.send('save-to-file', file);
});
