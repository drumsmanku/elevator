document.getElementById('up0').addEventListener('click', () => moveElevator(1));
document.getElementById('up1').addEventListener('click', () => moveElevator(2));
document.getElementById('down2').addEventListener('click', () => moveElevator(1, true));
document.getElementById('down1').addEventListener('click', () => moveElevator(0));

let currentLevel = 0;

function moveElevator(targetLevel, downButtonPressed = false) {
  const elevator = document.getElementById('elevator');
  const distance = Math.abs(targetLevel - currentLevel) * 100;

  let speed;

  if (downButtonPressed) {
    if (currentLevel === 1 && targetLevel === 1) {
      speed = 5000; // 5 seconds to reach level 1 if DOWN button pressed on level 1
    } else {
      speed = 10000; // 10 seconds to skip level 1 and reach Ground level if DOWN button pressed on level 2
    }
  } else {
    speed = distance === 100 ? 5000 : 10000;
  }

  elevator.style.transition = `bottom ${speed}ms linear`;
  elevator.style.bottom = `${targetLevel * 100}px`;

  currentLevel = targetLevel;
}
