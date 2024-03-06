document.getElementById('up0').addEventListener('click', function() { moveToLevel(1); });
document.getElementById('down1').addEventListener('click', function() { moveToLevel(0); });
document.getElementById('up1').addEventListener('click', function() { moveToLevel(2); });
document.getElementById('down2').addEventListener('click', function() { moveToLevel(1); });

let currentLevel = 0;

function moveToLevel(level) {
  const elevator = document.getElementById('elevator');
  let time = Math.abs(level - currentLevel) * 5; // seconds between levels

  let targetPosition = (2 - level) * 100; // Since level 2 is at the top, we invert the direction
  elevator.style.transition = `all ${time}s linear`;
  elevator.style.bottom = `${targetPosition}px`;

  currentLevel = level;
}
