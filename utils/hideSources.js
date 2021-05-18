const sourcesContainer = document.getElementById('sources-container');
const sourcesHr = document.getElementById('sources-hr');
const startButton = document.getElementById('start-button');

function hideSources() {
  sourcesContainer.style.display = 'none';
  sourcesHr.style.display = 'none';

  startButton.textContent = 'Update Vocabulary List';
}

exports.hideSources = hideSources;
