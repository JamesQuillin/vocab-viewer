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

function filterDataWithUIOptions(words) {
  let combinedArray = [];

  // keep parts of speech that are checked
  if (nounsCheckbox.checked) {
    let nouns = words.filter( entry => entry.pos_en == 'noun' );
    combinedArray.push(...nouns);
  }
  if (verbsCheckbox.checked) {
    let verbs = words.filter( entry => entry.pos_en == 'verb' );
    combinedArray.push(...verbs);
  }
  if (adjectivesCheckbox.checked) {
    let adjectives = words.filter ( entry => entry.pos_en == 'adjective' );
    combinedArray.push(...adjectives);
  }
  if (adverbsCheckbox.checked) {
    let adverbs = words.filter( entry => entry.pos_en == 'adverb' );
    combinedArray.push(...adverbs);
  }
  if (conjunctionsCheckbox.checked) {
    let conjunctions = words.filter( entry => entry.pos_en == 'conjunction' );
    combinedArray.push(...conjunctions);
  }

  // don't keep the levels that are unchecked
  if (!n5Checkbox.checked) combinedArray = combinedArray.filter( entry => entry.level != 5 );
  if (!n4Checkbox.checked) combinedArray = combinedArray.filter( entry => entry.level != 4 );
  if (!n3Checkbox.checked) combinedArray = combinedArray.filter( entry => entry.level != 3 );
  if (!n2Checkbox.checked) combinedArray = combinedArray.filter( entry => entry.level != 2 );
  if (!n1Checkbox.checked) combinedArray = combinedArray.filter( entry => entry.level != 1 );
  
  // remove non-n1-n5 words
  if (IGNORE_UNKNOWN_WORDS == true) {
    combinedArray = combinedArray.filter ( entry => entry.level == 5 || entry.level == 4 || entry.level == 3 || entry.level == 2 || entry.level == 1);
  }
  
  CURRENT_LIST_ACTIVE_SUBSET = combinedArray;
  return combinedArray;
}

exports.filterDataWithUIOptions = filterDataWithUIOptions;
