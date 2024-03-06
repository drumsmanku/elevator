let currentLevel = 0; // 0 for Ground Level, 1 for Level 1, 2 for Level 2
let requestedLevels = [];

// Bind buttons to their functionality
document.getElementById('up0').addEventListener('click', function() { requestMove(1); });
document.getElementById('down1').addEventListener('click', function() { requestMove(0); });
document.getElementById('up1').addEventListener('click', function() { requestMove(2); });
document.getElementById('down2').addEventListener('click', function() { requestMove(1); });

function requestMove(level) {
  if (!requestedLevels.includes(level)) {
    requestedLevels.push(level);
  }
  moveToNextRequested();
}

function moveToNextRequested() {
  if (requestedLevels.length === 0) {
    return; // No pending requests
  }

  const nextLevel = requestedLevels.shift(); // Get the next requested level
  moveToLevel(nextLevel);
}

function moveToLevel(level) {
  const elevator = document.getElementById('elevator');
  const time = Math.abs(level - currentLevel) * 5; // 5 seconds per level
  
  let targetPosition = (2 - level) * 100; // Adjust this based on your CSS
  
  elevator.style.transition = `bottom ${time}s linear`;
  elevator.style.bottom = `${targetPosition}px`;

  currentLevel = level;
}

