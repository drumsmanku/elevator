document.addEventListener('DOMContentLoaded', function() {
    const elevator = document.getElementById("elevator");
    let elevatorPosition = "ground"; // Initial position of the elevator

    document.querySelectorAll('.upBtn').forEach(button => {
        button.addEventListener('click', function() {
            if(elevatorPosition === "ground") {
                elevator.style.transform = "translateY(-33.3%)"; // Move to Level 1
                elevatorPosition = "level1";
                setTimeout(() => {
                    if(elevatorPosition !== "level1") return; // Check if stopped at level 1
                    elevator.style.transform = "translateY(-66.6%)"; // Move to Level 2
                }, 5000); // 5 seconds to decision
            }
            // If UP button on level 1 is clicked, verify if elevator is moving up to stop or go past
            if(elevatorPosition === "level1") {
                elevator.style.transform = "translateY(-66.6%)"; // Move to Level 2
            }
        });
    });

    document.querySelectorAll('.downBtn').forEach(button => {
        button.addEventListener('click', function() {
            if(elevatorPosition === "level2") {
                elevator.style.transform = "translateY(-33.3%)"; // Move to Level 1
                elevatorPosition = "level1";
                setTimeout(() => {
                    if(elevatorPosition !== "level1") return; // Check if stopped at level 1
                    elevator.style.transform = "translateY(0)"; // Move to Ground Level
                }, 5000); // 5 seconds to decision
            }
            if(elevatorPosition === "level1") {
                elevator.style.transform = "translateY(0)"; // Move to Ground Level
            }
        });
    });
});
