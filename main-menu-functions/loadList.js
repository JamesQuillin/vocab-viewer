const { app, dialog } = require('electron').remote;
const fs = require('fs');
const { updateUIFromOptions } = require('../utils/updateUIFromOptions');
const { filterDataWithUIOptions } = require('../utils/filterDataWithUIOptions');
const { renderTable } = require('../utils/renderTable');
const { hideSources } = require('../utils/hideSources.js');

function loadList() {
  dialog.showOpenDialog({
    title: 'Select the list to open',
    defaultPath: app.getPath('userData'),
    properties: ['openFile'],
    filters: [
      {
        name: 'Vocabulary Lists',
        extensions: ['txt']
      }
    ]
  }).then( (selectedFile) => {
    if (!selectedFile.canceled) {
      fs.readFile(selectedFile.filePaths[0].toString(), 'utf8', function (err, data) {
        if (err) throw err;

        let parsedData = JSON.parse(data);
        parsedData.list = JSON.parse(parsedData.list);
        parsedData.options = JSON.parse(parsedData.options);
        
        // let's us skip to the end of the processTextData() step
        CURRENT_LIST_FULL_DATA = parsedData.list;

        // load the correct state for the options
        CURRENT_OPTIONS = parsedData.options;

        // update the UI to reflect the state for the options
        updateUIFromOptions(parsedData.options);

        // generate the CURRENT_LIST_ACTIVE_SUBSET that we want to render
        let filteredWords = filterDataWithUIOptions(parsedData.list);

        // make sure that the "start" button knows to work from a list that is
        // in memory and not an original source source (file/text/link)
        LIST_IS_LOADED_IGNORE_SOURCE = true;

        // and finally render the table in the same state that it was saved
        renderTable(filteredWords);

        hideSources();
      });
    }
  }).catch(err => {
    console.log(err)
  });
}

exports.loadList = loadList;
