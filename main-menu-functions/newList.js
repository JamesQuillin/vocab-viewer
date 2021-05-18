const radioFile = document.getElementById('radio-file');

const fileNameInputLabel = document.getElementById('file-name-input-label');
const pasteInputBox = document.getElementById('paste-input-box');
const linkInputBox = document.getElementById('link-input-box');

const nounsCheckbox = document.getElementById('nouns-checkbox');
const verbsCheckbox = document.getElementById('verbs-checkbox');
const adjectivesCheckbox = document.getElementById('adjectives-checkbox');
const adverbsCheckbox = document.getElementById('adverbs-checkbox');
const conjunctionsCheckbox = document.getElementById('conjunctions-checkbox');

const n5Checkbox = document.getElementById('n5-checkbox');
const n4Checkbox = document.getElementById('n4-checkbox');
const n3Checkbox = document.getElementById('n3-checkbox');
const n2Checkbox = document.getElementById('n2-checkbox');
const n1Checkbox = document.getElementById('n1-checkbox');

const kanjiCheckbox = document.getElementById('kanji-checkbox');
const readingCheckbox = document.getElementById('reading-checkbox');
const definitionCheckbox = document.getElementById('definition-checkbox');
const levelCheckbox = document.getElementById('level-checkbox');
const partOfSpeechCheckbox = document.getElementById('part-of-speech-checkbox');
const countCheckbox = document.getElementById('count-checkbox');

const { clearTable } = require('../utils/clearTable.js');
const { showSources } = require('../utils/showSources.js');

function newList() {

  fileNameInputLabel.textContent = 'No File Chosen';
  pasteInputBox.value = '';
  linkInputBox.value = '';

  radioFile.checked = true;

  showSources();

  nounsCheckbox.checked = true;
  verbsCheckbox.checked = true;
  adjectivesCheckbox.checked = false;
  adverbsCheckbox.checked = false;
  conjunctionsCheckbox.checked = false;

  n5Checkbox.checked = true;
  n4Checkbox.checked = true;
  n3Checkbox.checked = false;
  n2Checkbox.checked = false;
  n1Checkbox.checked = false;

  kanjiCheckbox.checked = true;
  readingCheckbox.checked = true;
  definitionCheckbox.checked = true;
  levelCheckbox.checked = false;
  partOfSpeechCheckbox.checked = false;
  countCheckbox.checked = false;

  clearTable();

  LIST_IS_LOADED_IGNORE_SOURCE = false;
}

exports.newList = newList;
