document.getElementById('up0').addEventListener('click', () => moveElevator(2, true));
document.getElementById('up1').addEventListener('click', () => upPressedOn1 = true);
document.getElementById('down2').addEventListener('click', () => moveElevator(0, false));
document.getElementById('down1').addEventListener('click', () => downPressedOn1 = true);

function moveElevator(targetLevel, goingUp) {
  if (goingUp) {
    if (upPressedOn1) {
        // Case when Up is pressed on level 1: move to level 1 first, then to level 2.
        elevatorToLevel(1, 5000); // Takes 5 seconds to get to level 1
        setTimeout(() => elevatorToLevel(2, 5000), 5000); // Takes additional 5 seconds to get to level 2 from level 1
    } else {
        // Case when Up is not pressed on level 1: move directly to level 2.
        elevatorToLevel(2, 10000); // Takes 10 seconds to get directly to level 2
    }
  } else {
    if (downPressedOn1) {
        // Case when Down is pressed on level 1: move to level 1 first, then to ground.
        elevatorToLevel(1, 5000); // Takes 5 seconds to get to level 1 from level 2
        setTimeout(() => elevatorToLevel(0, 5000), 5000); // Takes additional 5 seconds to get to ground level
    } else {
        // Case when Down is not pressed on level 1: move directly to ground level.
        elevatorToLevel(0, 10000); // Takes 10 seconds to get directly to ground level
    }
  }

  // Reset the button states after moving, regardless of the path taken
  upPressedOn1 = false;
  downPressedOn1 = false;
}

function elevatorToLevel(level, travelTime) {
  const elevator = document.getElementById('elevator');
  elevator.style.transition = `bottom ${travelTime}ms linear`;
  setTimeout(() => {
    elevator.style.bottom = `${level * 100}px`; // Assuming each level's height is 100px
  }, 10); // Give a slight delay before applying the style to ensure the transition takes effect
}
