// script.js
document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let currentLevel = 0; // Ground level
  
    document.querySelectorAll('.up, .down').forEach(button => {
      button.addEventListener('click', (e) => {
        const desiredLevel = e.target.parentElement.id === 'ground-level' ? 0 : (e.target.parentElement.id === 'level-1' ? 1 : 2);
        const direction = e.target.classList.contains('up') ? 'up' : 'down';
        
        moveElevator(desiredLevel, direction);
      });
    });
  
    function moveElevator(level, direction) {
      // Determine target position based on direction and level
      let targetPosition = (level === 1 ? 100 : (level === 2 ? 200 : 0)); // Simplified; actual calculation will depend on your layout
      elevator.style.bottom = targetPosition + 'px';
  
      // Here, more logic can be implemented to check for button presses on each level as described in the instructions
    }
  });
  