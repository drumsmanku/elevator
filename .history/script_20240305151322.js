// script.js
document.getElementById('up0').addEventListener('click', () => moveElevator(1));
document.getElementById('up1').addEventListener('click', () => moveElevator(2));
document.getElementById('down2').addEventListener('click', () => moveElevator(1));
document.getElementById('down1').addEventListener('click', () => moveElevator(0));

let currentLevel = 0;

function moveElevator(targetLevel, direction) {
  const elevator = document.getElementById('elevator');
  const distance = Math.abs(targetLevel - currentLevel) * 100; // each level is 100px apart

  let speed;
  if (direction === 'up') {
    speed = distance === 100 ? 5000 : 10000; // 5 seconds to next level, 10 seconds to skip a level
  } else if (direction === 'down') {
    speed = targetLevel === 1 ? 5000 : 10000; // 5 seconds to reach level 1, 10 seconds to reach Ground level
  }

  elevator.style.transition = `bottom ${speed}ms linear`;
  elevator.style.bottom = `${targetLevel * 100}px`;

  currentLevel = targetLevel;
}
