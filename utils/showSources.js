const sourcesContainer = document.getElementById('sources-container');
const sourcesHr = document.getElementById('sources-hr');
const startButton = document.getElementById('start-button');

function showSources() {
  sourcesContainer.style.display = 'block';
  sourcesHr.style.display = 'block';

  startButton.textContent = 'Generate Vocabulary List';
}

exports.showSources = showSources;
