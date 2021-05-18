const { app, dialog } = require('electron').remote;
const fileNameInputLabel = document.getElementById('file-name-input-label');

function fileSelectInputListener() {
  dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: app.getPath('downloads'),
  }).then(result => {
    if (result.filePaths) {
      // save the full file name (path+name) for later use just on the element itself
      fileNameInputLabel.fullFilePathAndName = result.filePaths[0];

      // set the label the user sees to be just the name of the file (the last bit of the filepath)
      let arr;
      if (process.platform === 'win32') {
        arr = result.filePaths[0].split('\\');
      } else {
        arr = result.filePaths[0].split('/');
      }
      fileNameInputLabel.textContent = arr[arr.length - 1];
    }
  }).catch(err => {
    console.log(err);
  });
}

exports.fileSelectInputListener = fileSelectInputListener;
