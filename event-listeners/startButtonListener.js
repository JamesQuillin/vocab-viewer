const fs = require('fs');
const { ipcMain, BrowserWindow } = require('electron').remote;

const { clearTable } = require('../utils/clearTable.js');
const { setOptionsFromUI } = require('../utils/setOptionsFromUI.js');
const { processTextData } = require('../utils/processTextData.js');
const { filterDataWithUIOptions } = require('../utils/filterDataWithUIOptions.js');
const { renderTable } = require('../utils/renderTable.js');
const { hideSources } = require('../utils/hideSources.js');

const radioFile = document.getElementById('radio-file');
const fileNameInputLabel = document.getElementById('file-name-input-label');
const radioText = document.getElementById('radio-text');
const pasteInputBox = document.getElementById('paste-input-box');
const radioLink = document.getElementById('radio-link');
const linkInputBox = document.getElementById('link-input-box');

function startButtonListener() {
  clearTable();
  setOptionsFromUI();

  if (LIST_IS_LOADED_IGNORE_SOURCE == true) {
    let filteredWords = filterDataWithUIOptions(CURRENT_LIST_FULL_DATA);
    renderTable(filteredWords);
  } else {
    if (radioFile.checked) {
      let file = fileNameInputLabel.fullFilePathAndName;
      fs.readFile(file, {encoding: 'utf-8'}, (err, fileData) => {
        if (err) { console.log(err) } else {
          processTextData(fileData).then((results) => {
            let filteredWords = filterDataWithUIOptions(results);
            renderTable(filteredWords);
            hideSources();
            LIST_IS_LOADED_IGNORE_SOURCE = true;
          });
        }
      });
  
    } else if (radioText.checked) {
      let text = pasteInputBox.value;
      processTextData(text).then((results) => {
        let filteredWords = filterDataWithUIOptions(results);
        renderTable(filteredWords);
        hideSources();
        LIST_IS_LOADED_IGNORE_SOURCE = true;
      });
  
    } else if (radioLink.checked) {
      let text = getDataFromLink();
      function getDataFromLink() {
        let webpage = new BrowserWindow({
          show: false, // hide the window from the user so it all happens in the background
          webPreferences: {
            nodeIntegration: true, // allow use of ipc
            show: false
          }
        });
        
        webpage.loadURL(linkInputBox.value);
      
        webpage.webContents.on('dom-ready', () => {
          webpage.webContents.executeJavaScript(`
            function textNodesUnder(el){
              var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
              while(n=walk.nextNode()) a.push(n);
              return a;
            }
      
            let nodes = textNodesUnder(document.body);
            let dataString = '';
      
            nodes.forEach(node => {
              dataString = dataString + node.data;
            });
  
            var ipcRenderer = require('electron').ipcRenderer;
            ipcRenderer.send('data-received-from-link', dataString);
          `).then((result) => {
            webpage.close();
          });
        });
      }
      // after getDataFromLink() the webpage opened by the link is silently closed and
      // the rest is handled in the ipcMain listener for 'data-received-from-link' below
  
    } else {
      console.log('nothing selected - doing nothing');
    }
  }
}

exports.startButtonListener = startButtonListener;

ipcMain.on('data-received-from-link', function (event, text) {
  processTextData(text).then((results) => {
    let filteredWords = filterDataWithUIOptions(results);
    renderTable(filteredWords);
    hideSources();
    LIST_IS_LOADED_IGNORE_SOURCE = true;
  });
});
