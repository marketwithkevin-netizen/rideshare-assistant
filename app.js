function getRecommendation() {
  const airport = document.getElementById('airport').value;
  const currentZone = document.getElementById('currentZone').value;
  const vehicleType = document.getElementById('vehicleType').value;
  const airportWait = document.getElementById('airportWait').value;
  const time = document.getElementById('time').value;
  const traffic = document.getElementById('traffic').value;
  const event = document.getElementById('event').value;

  const recommendation = evaluateAirportDecision({
    airport,
    currentZone,
    vehicleType,
    airportWait,
    time,
    traffic,
    event
  });

  const resultBox = document.getElementById('result');
  const decisionText = document.getElementById('decision');
  const reasonText = document.getElementById('reason');
  const actionText = document.getElementById('action');
  const scoreText = document.getElementById('score');

  resultBox.className = 'result ' + recommendation.resultClass;
  resultBox.style.display = 'block';
  decisionText.textContent = recommendation.decision;
  reasonText.innerHTML = recommendation.reasons
    .map(reason => `• ${reason}`)
    .join('<br><br>');
  actionText.textContent = recommendation.action;
  scoreText.textContent = 'Estimated Hourly: ' + recommendation.hourlyEstimate;
}

document
  .getElementById('recommendationButton')
  .addEventListener('click', getRecommendation);
