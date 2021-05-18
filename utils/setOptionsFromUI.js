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

function setOptionsFromUI() {
  CURRENT_OPTIONS.verbs =  verbsCheckbox.checked ? true : false;
  CURRENT_OPTIONS.nouns =  nounsCheckbox.checked ? true : false;
  CURRENT_OPTIONS.adjectives =  adjectivesCheckbox.checked ? true : false;
  CURRENT_OPTIONS.adverbs =  adverbsCheckbox.checked ? true : false;
  CURRENT_OPTIONS.conjunctions =  conjunctionsCheckbox.checked ? true : false;

  CURRENT_OPTIONS.n5 =  n5Checkbox.checked ? true : false;
  CURRENT_OPTIONS.n4 =  n4Checkbox.checked ? true : false;
  CURRENT_OPTIONS.n3 =  n3Checkbox.checked ? true : false;
  CURRENT_OPTIONS.n2 =  n2Checkbox.checked ? true : false;
  CURRENT_OPTIONS.n1 =  n1Checkbox.checked ? true : false;

  CURRENT_OPTIONS.kanji =  kanjiCheckbox.checked ? true : false;
  CURRENT_OPTIONS.reading =  readingCheckbox.checked ? true : false;
  CURRENT_OPTIONS.definition =  definitionCheckbox.checked ? true : false;
  CURRENT_OPTIONS.level =  levelCheckbox.checked ? true : false;
  CURRENT_OPTIONS.partOfSpeech =  partOfSpeechCheckbox.checked ? true : false;
  CURRENT_OPTIONS.count =  countCheckbox.checked ? true : false;
}

exports.setOptionsFromUI = setOptionsFromUI;
