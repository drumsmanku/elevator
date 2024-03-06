document.addEventListener('DOMContentLoaded', function() {
    const elevator = document.getElementById("elevator");
    let targetFloor = 0; // Start at Ground Level

    const moveElevator = (newFloor) => {
        const buildingHeight = document.querySelector('.building').offsetHeight;
        const floorHeight = buildingHeight / 3;
        const newBottomValue = newFloor * floorHeight;

        elevator.style.bottom = `${newBottomValue}px`; // Move Elevator to new floor
        targetFloor = newFloor;
    };

    // Listen to Up Button Clicks
    document.querySelectorAll('.upBtn').forEach((button, index) => {
        button.addEventListener('click', function() {
            moveElevator(index + 1); // Move one floor up
        });
    });

    // Listen to Down Button Clicks
    document.querySelectorAll('.downBtn').forEach((button, index) => {
        button.addEventListener('click', function() {
            moveElevator(index); // Move one floor down
        });
    });

});
