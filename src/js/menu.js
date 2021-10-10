const { app, Menu } = require('electron');

const template = [{
    label: 'Меню',
    submenu: [
        {
            label: 'Импорт CSV',
            accelerator: 'Ctrl+O',
            async click (item, currentWindow) {
                currentWindow.webContents.send('action-load-payments');
            }
        },
        {
            label: 'Экспорт CSV',
            accelerator: 'Ctrl+S',
            async click (item, currentWindow) {
                currentWindow.webContents.send('action-dump-payments');
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Выйти',
            accelerator: 'Ctrl+Q',
            click () {
                app.quit();
            }
        },
    ]
}];

if (process.env.NODE_ENV != 'production') {
    template.push({
        label: 'DevTools',
        accelerator: 'Ctrl+I',
        role: 'toggleDevTools'
    });
}

exports.getInstance = function () {
    return Menu.buildFromTemplate(template);
}
