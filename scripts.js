// Selecting DOM Elements
const totalProgressNum = document.getElementById('progress-main');
const totalProgressBar = document.getElementById('range-main');
const goalsContainer = document.getElementById('goals-container');

// MAIN GOAL PROGRESS BAR
const calculateAverageProgress = function (goals) {
  if (goals.length === 0) {
    return 0;
  }

  const totalProgress = goals.reduce((sum, goal) => {
    return sum + (goal.progress !== undefined ? parseFloat(goal.progress) : 0);
  }, 0);

  return (totalProgress / goals.length).toFixed(2);
};

const updateTotalProgressBar = function (averageProgress) {
  totalProgressBar.style.setProperty('--p', `${averageProgress}`);
  totalProgressNum.textContent = `${averageProgress}%`;
};

// ALL THE INDIVIDUAL GOALS
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
  goals.forEach(goalData => {
    const goal = createGoal(goalData);
    goalsContainer.appendChild(goal);
  });

  const averageProgress = calculateAverageProgress(goals);
  updateTotalProgressBar(averageProgress);
};

// FETCHING DATA FROM JSON FILE
fetch('./goals.json')
  .then(response => response.json())
  .then(goals => renderGoals(goals))
  .catch(err => console.error('Error loading JSON data', err));
