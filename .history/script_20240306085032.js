const elevator = document.getElementById("elevator");
let currentLevel = 0; // Ground floor

// Adjust these as necessary
const positions = {
    0: "200px", // Position for Ground level
    1: "100px", // Position for Level 1
    2: "0px"    // Position for Level 2
};

document.getElementById("up0").onclick = function() {
    moveToLevel(1);
};

document.getElementById("up1").onclick = function() {
    moveToLevel(2);
};

document.getElementById("down1").onclick = function() {
    moveToLevel(0);
};

document.getElementById("down2").onclick = function() {
    moveToLevel(1);
};

function moveToLevel(level) {
    if (level > currentLevel) {
        elevator.style.transition = `${(level - currentLevel) * 5}s`;
    } else {
        elevator.style.transition = `${(currentLevel - level) * 5}s`;
    }
    elevator.style.bottom = positions[level];
    currentLevel = level;
}
