const createGoal = function (goalData) {
  const goalElement = document.createElement('div');

  goalElement.innerHTML = `
    <div class="goal">
      <h2>${goalData.title}</h2>
      <div class="progress-secondary">
        Total Progress: <span class="progress">${
          goalData.progress !== undefined ? `${goalData.progress}%` : '0.00%'
        }</span>
        <div
          class="range-secondary"
          style="--p: ${
            goalData.progress !== undefined ? goalData.progress : '0.00%'
          }; --h: 10px; --w: 400px"
        ></div>
      </div>
      <p class="description">${goalData.description}</p>
      <ul class="pointers">
          ${goalData.pointers.map(pointer => `<li>${pointer}</li>`).join('')}
      </ul>
    </div>
  `;
  return goalElement;
};

const renderGoals = function (goals) {
  const goalsContainer = document.querySelector('.goals-container');

  goals.forEach(goalData => {
    const goal = createGoal(goalData);
    goalsContainer.appendChild(goal);
  });
};

fetch('./goals.json')
  .then(response => response.json())
  .then(goals => renderGoals(goals))
  .catch(err => console.error('Error loading JSON data', err));
