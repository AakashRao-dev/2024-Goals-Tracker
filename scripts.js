const handleJsonData = function (goals) {
  goals.map(goal => console.log(goal));
};

fetch('./goals.json')
  .then(response => response.json())
  .then(handleJsonData)
  .catch(err => console.error('Error loading JSON data', err));
