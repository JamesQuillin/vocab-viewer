const kanjiCheckbox = document.getElementById('kanji-checkbox');
const readingCheckbox = document.getElementById('reading-checkbox');
const definitionCheckbox = document.getElementById('definition-checkbox');
const levelCheckbox = document.getElementById('level-checkbox');
const partOfSpeechCheckbox = document.getElementById('part-of-speech-checkbox');
const countCheckbox = document.getElementById('count-checkbox');

const mainTableHead = document.getElementById('main-table-head');
const mainTableBody = document.getElementById('main-table-body');

function renderTable(finalWords) {
  mainTableHead.innerHTML = `
    ${kanjiCheckbox.checked ? '<td>Word</td>' : ''}
    ${readingCheckbox.checked ? '<td>Reading</td>' : ''}
    ${definitionCheckbox.checked ? '<td>Definition</td>' : ''}
    ${levelCheckbox.checked ? '<td class="center">JLPT Level</td>' : ''}
    ${partOfSpeechCheckbox.checked ? '<td class="center">Part of Speech</td>' : ''}
    ${countCheckbox.checked ? '<td class="center">Count</td>' : ''}
  `;

  mainTableBody.innerHTML = finalWords.reduce( (total, currentWord, index, arr) => {
    return total + 
    `<tr>
      ${kanjiCheckbox.checked ? `<td>${currentWord.kanji ? currentWord.kanji : currentWord.word}</td>` : ''}
      ${readingCheckbox.checked ? `<td>${currentWord.reading ? currentWord.reading : currentWord.word}</td>` : ''}
      ${definitionCheckbox.checked ? `<td class="wide">${currentWord.definition}</td>` : ''}
      ${levelCheckbox.checked ? `<td class="center">n${currentWord.level}</td>` : ''}
      ${partOfSpeechCheckbox.checked ? `<td class="center">${currentWord.pos_en}</td>` : ''}
      ${countCheckbox.checked ? `<td class="center">${currentWord.count}</td>` : ''}
    </tr>`;
  }, '');
}

exports.renderTable = renderTable;
