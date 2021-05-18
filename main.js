const { app, Menu, BrowserWindow } = require('electron');
const { template } = require('./menuTemplate.js');

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1270,
    height: 860,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();
});

// Quit when all windows are closed, except on macOS, where it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
