const { app, dialog } = require('electron').remote;
const fs = require('fs');

function saveList() {
  let data = JSON.stringify({
    options: JSON.stringify(CURRENT_OPTIONS),
    list: JSON.stringify(CURRENT_LIST_FULL_DATA)
  });
  
  dialog.showSaveDialog({
    title: 'Select the File Path to save',
    buttonLabel: 'Save',
    defaultPath: app.getPath('userData'),
    filters: [
      {
        name: 'Vocabulary Lists',
        extensions: ['txt']
      }
    ]
  }).then(newFile => {
    if (!newFile.canceled) {
      fs.writeFile(newFile.filePath.toString(), data, function (err) {
        if (err) {
          throw err;
        }
      });
    }
  }).catch(err => {
    console.log(err);
  });
}

exports.saveList = saveList;
