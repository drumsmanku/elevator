document.getElementById("up0").addEventListener("click", function() { moveToLevel(1, 5); });
document.getElementById("up1").addEventListener("click", function() { moveToLevel(2, 10); });
document.getElementById("down2").addEventListener("click", function() { moveToLevel(1, 5); });
document.getElementById("down1").addEventListener("click", function() { moveToLevel(0, 10); });

let currentLevel = 0;
const elevator = document.getElementById("elevator");

function moveToLevel(level, time) {
    const levelHeight = 105; // Assuming each "floor" is 100px high + 5px margin
    elevator.style.transition = `bottom ${time}s linear`;
    elevator.style.bottom = `${level * levelHeight}px`;
    currentLevel = level;
}
