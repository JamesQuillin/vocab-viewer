const { ipcRenderer } = require('electron');

const { fileSelectInputListener } = require('./event-listeners/fileSelectInputListener.js');
const { startButtonListener } = require('./event-listeners/startButtonListener.js');

const { exportAnkiDeck } = require('./main-menu-functions/exportAnkiDeck.js');
const { newList } = require('./main-menu-functions/newList.js');
const { loadList } = require('./main-menu-functions/loadList.js');
const { saveList } = require('./main-menu-functions/saveList.js');

ipcRenderer.on('export deck', exportAnkiDeck);
ipcRenderer.on('new list', newList);
ipcRenderer.on('load list', loadList);
ipcRenderer.on('save list', saveList);

document.getElementById('file-select-input').addEventListener('click', fileSelectInputListener);
document.getElementById('start-button').addEventListener('click', startButtonListener);

let CURRENT_LIST_FULL_DATA = 'not yet set';
let CURRENT_LIST_ACTIVE_SUBSET = null;
let LIST_IS_LOADED_IGNORE_SOURCE = false;
let CURRENT_OPTIONS = {
  verbs: true,
  nouns: true,
  adjectives: false,
  adverbs: false,
  conjunctions: false,
  n5: true,
  n4: true,
  n3: false,
  n2: false,
  n1: false,
  kanji: true,
  reading: true,
  definition: true,
  level: false,
  partOfSpeech: false,
  count: false
};
let IGNORE_UNKNOWN_WORDS = true;
