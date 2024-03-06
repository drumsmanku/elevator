document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const FLOOR_HEIGHT = window.innerHeight / 3; // Assuming 3 floors
    let currentFloor = 0; // Ground floor
    let moving = false; // Flag to check if the elevator is currently moving
    let upButtonPressed = false; // Flag for UP button press

    // Event listeners for buttons
    document.getElementById('up0').addEventListener('click', () => {
        upButtonPressed = true;
        moveElevator();
    });

    function moveElevator() {
        if (moving || !upButtonPressed) return;

        moving = true;
        upButtonPressed = false; // Reset the flag after starting the elevator
        const targetFloor = 1; // Set the target floor to level 1
        const duration = Math.abs(targetFloor - currentFloor) * 5000; // 5 seconds per floor
        elevator.style.transition = `bottom ${duration}ms`;
        elevator.style.bottom = `${targetFloor * FLOOR_HEIGHT}px`;

        setTimeout(() => {
            currentFloor = targetFloor;
            moving = false;
        }, duration);
    }
});
