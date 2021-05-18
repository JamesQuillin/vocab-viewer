const { BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      { label: 'New', accelerator: 'CmdOrCtrl+N', click: () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow.webContents.send('new list');
      } },
      { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow.webContents.send('load list');
      } },
      { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow.webContents.send('save list');
      } },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'exportMenu' }
  {
    label: 'Export',
    submenu: [
      { label: 'Using only Kana', click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          focusedWindow.webContents.send('export deck', 'kana');
        }
      },
      { label: 'Using Kanji where available', click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          focusedWindow.webContents.send('export deck', 'both');
        }
      },
      { label: 'Using only Kanji', click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          focusedWindow.webContents.send('export deck', 'kanji');
        }
      }
    ]
  },
  // // { role: 'windowMenu' }
  // {
  //   label: 'Window',
  //   submenu: [
  //     { role: 'minimize' },
  //     { role: 'zoom' },
  //     ...(isMac ? [
  //       { type: 'separator' },
  //       { role: 'front' },
  //       { type: 'separator' },
  //       { role: 'window' }
  //     ] : [
  //       { role: 'close' }
  //     ])
  //   ]
  // },
  {
    role: 'Help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
];

exports.template = template;
