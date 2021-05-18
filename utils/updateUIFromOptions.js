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

function updateUIFromOptions(options) {
  fileNameInputLabel.textContent = 'No File Chosen';
  pasteInputBox.value = '';
  linkInputBox.value = '';

  radioFile.checked = true;

  options.verbs ? verbsCheckbox.checked = true : verbsCheckbox.checked = false;
  options.nouns ? nounsCheckbox.checked = true : nounsCheckbox.checked = false;
  options.adjectives ? adjectivesCheckbox.checked = true : adjectivesCheckbox.checked = false;
  options.adverbs ? adverbsCheckbox.checked = true : adverbsCheckbox.checked = false;
  options.conjunctions ? conjunctionsCheckbox.checked = true : conjunctionsCheckbox.checked = false;

  options.n5 ? n5Checkbox.checked = true : n5Checkbox.checked = false;
  options.n4 ? n4Checkbox.checked = true : n4Checkbox.checked = false;
  options.n3 ? n3Checkbox.checked = true : n3Checkbox.checked = false;
  options.n2 ? n2Checkbox.checked = true : n2Checkbox.checked = false;
  options.n1 ? n1Checkbox.checked = true : n1Checkbox.checked = false;

  options.kanji ? kanjiCheckbox.checked = true : kanjiCheckbox.checked = false;
  options.reading ? readingCheckbox.checked = true : readingCheckbox.checked = false;
  options.definition ? definitionCheckbox.checked = true : definitionCheckbox.checked = false;
  options.level ? levelCheckbox.checked = true : levelCheckbox.checked = false;
  options.partOfSpeech ? partOfSpeechCheckbox.checked = true : partOfSpeechCheckbox.checked = false;
  options.count ? countCheckbox.checked = true : countCheckbox.checked = false;
}

exports.updateUIFromOptions = updateUIFromOptions;
