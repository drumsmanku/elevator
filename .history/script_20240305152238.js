// script.js
document.getElementById('up0').addEventListener('click', () => moveElevator(1));
document.getElementById('up1').addEventListener('click', () => moveElevator(2));
document.getElementById('down2').addEventListener('click', () => moveElevator(1));
document.getElementById('down1').addEventListener('click', () => moveElevator(0));

let currentLevel = 0;

function moveElevator(targetLevel, downButtonPressed = false) {
  const elevator = document.getElementById('elevator');
  const distance = Math.abs(targetLevel - currentLevel) * 100; // each level is 100px apart
  let speed;

  if (downButtonPressed && currentLevel === 1) {
    speed = 5000; // 5 seconds to reach level 1 if DOWN button pressed on level 1
  } else {
    speed = distance === 100 ? 5000 : 10000; // 5 seconds to next level, 10 seconds to skip a level
  }

  elevator.style.transition = `bottom ${speed}ms linear`;
  elevator.style.bottom = `${targetLevel * 100}px`;

  currentLevel = targetLevel;
}
