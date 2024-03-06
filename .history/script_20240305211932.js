let currentFloor = 0;

function requestUp(floor) {
    if (floor === 'ground' && currentFloor === 0) {
        moveElevator(1, 5000);
    } else if (floor === 'level1' && (currentFloor === 0 || currentFloor === 2)) {
        moveElevator(1, 5000);
    } else if (floor === 'level2' && (currentFloor === 0 || currentFloor === 1)) {
        moveElevator(2, 10000);
    }
}

function requestDown(floor) {
    if (floor === 'level2' && currentFloor === 2) {
        moveElevator(1, 10000);
    } else if (floor === 'level1' && (currentFloor === 1 || currentFloor === 2)) {
        moveElevator(1, 5000);
    } else if (floor === 'ground' && (currentFloor === 1 || currentFloor === 2)) {
        moveElevator(0, 10000);
    }
}

function moveElevator(destinationFloor, time) {
    if (destinationFloor !== currentFloor) {
        // Update the UI to simulate the elevator movement
        animateElevator(destinationFloor, time);
        // Update the currentFloor variable after the animation completes
        setTimeout(() => {
            currentFloor = destinationFloor;
        }, time);
    }
}

function animateElevator(destinationFloor, time) {
    // Implement animation logic to simulate elevator movement
    const door = document.querySelector('.elevator-door');
    door.style.transition = `transform ${time / 1000}s linear`;
    door.style.transform = `translateY(${(2 - destinationFloor) * 120}px)`; // Adjust as needed
    setTimeout(() => {
        door.style.transition = 'none';
    }, time);
}
