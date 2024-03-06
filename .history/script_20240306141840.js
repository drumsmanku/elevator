document.addEventListener('DOMContentLoaded', function() {
    const elevator = document.getElementById('elevator');
    const buttons = document.querySelectorAll('button');
    let currentFloor = 0;
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const targetFloor = parseInt(this.getAttribute('data-set-floor'));
        moveElevator(targetFloor);
      });
    });
  
    function moveElevator(targetFloor) {
      // Elevator movement duration depends on the distance
      const duration = (Math.abs(targetFloor - currentFloor) === 1 ? 5 : 10) + 's';
      elevator.style.transition = `bottom ${duration} linear`;
  
      // Update elevator's bottom based on the target floor
      elevator.style.bottom = `${(targetFloor * 33.33)}%`;
  
      currentFloor = targetFloor; // Update current floor once movement is initiated
    }
  });
  