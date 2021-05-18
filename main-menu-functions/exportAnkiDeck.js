const { app, dialog } = require('electron').remote;
const fs = require('fs');

function exportAnkiDeck() {

  let selectedOption = '';
  if (arguments[1] == 'kana' || arguments[1] == 'both' || arguments[1] == 'kanji') {
    selectedOption = arguments[1];
  } else {
    selectedOption = 'kana';
  }
  
  let data = '';
  CURRENT_LIST_ACTIVE_SUBSET.forEach( word => {

    // don't include the words that don't have data/aren't in the n5-n1 lists
    if (word.definition) {

      function isKanji(someWord) {
        if (someWord.reading) {
          return true;
        } else {
          return false;
        }
      }

      // kana only
      if (selectedOption == 'kana') {
        if (isKanji(word)) {
          data = data + `${word.reading}; ${word.definition};\n`
        } else {
          data = data + `${word.word}; ${word.definition};\n`
        }
      }
      
      // kanji where available
      else if (selectedOption == 'both') {
        if (isKanji(word)) {
          data = data + `${word.word}; ${word.reading} - ${word.definition};\n`
        } else {
          data = data + `${word.word}; ${word.definition};\n`
        }
      }

      // kanji only
      else if (selectedOption == 'kanji') {
        if (isKanji(word)) {
          data = data + `${word.word}; ${word.reading} - ${word.definition};\n`
        } else {
          // skip the word since we only want kanji and it has none :)
        }
      }

      // default: use the kana only option
      else {
        if (isKanji(word)) {
          data = data + `${word.reading}; ${word.definition};\n`
        } else {
          data = data + `${word.word}; ${word.definition};\n`
        }
      }
    }
  });

  data = data.trimEnd(); // remove the final newline character/empty line
  
  dialog.showSaveDialog({
    title: 'Select the File Path to save',
    buttonLabel: 'Save',
    defaultPath: app.getPath('desktop'),
    filters: [
      {
        name: 'Anki deck',
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

exports.exportAnkiDeck = exportAnkiDeck;
