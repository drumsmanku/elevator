document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const elevatorDoor = elevator.querySelector('.elevator-door');
    const floors = document.querySelectorAll('.level');
    const upButtons = document.querySelectorAll('.level button[id^="up"]');
    const downButtons = document.querySelectorAll('.level button[id^="down"]');
    const display = document.querySelector('.display');
  
    let targetFloors = [];
    let currentFloor = 0;
    let moving;
    let elevatorStatus = 'idle';
    let elevatorWaitingTime = 2000;
    let previousTime = new Date().getTime();
    let deltaTime = 0;
  
    elevatorDoor.style.width = '1px';
    elevator.style.bottom = '0px';
  
    upButtons.forEach(button => {
      button.addEventListener('click', function () {
        const floor = parseInt(this.parentNode.getAttribute('id').replace('level', ''));
        requestFloor(floor);
      });
    });
  
    downButtons.forEach(button => {
      button.addEventListener('click', function () {
        const floor = parseInt(this.parentNode.getAttribute('id').replace('level', ''));
        moveToFloor(floor);
      });
    });
  
    function requestFloor(floor) {
      if (!targetFloors.includes(floor)) {
        targetFloors.push(floor);
        targetFloors.sort((a, b) => a - b);
      }
      processNextFloor();
    }
  
    function moveToFloor(floor) {
      targetFloors.push(floor);
      targetFloors.sort((a, b) => b - a);
      processNextFloor();
    }
  
    function processNextFloor() {
      if (targetFloors.length === 0 || typeof moving !== 'undefined') {
        return;
      }
  
      const nextFloor = targetFloors.shift();
      const direction = nextFloor > currentFloor ? 'up' : 'down';
      console.log(`Moving ${direction} to floor ${nextFloor}`);
  
      moving = true;
      moveElevatorTo(nextFloor * 33, () => {
        console.log(`Arrived at floor ${nextFloor}`);
        currentFloor = nextFloor;
        moving = false;
        if (targetFloors.length > 0) {
          processNextFloor();
        }
      });
    }
  
    function moveElevatorTo(position, callback) {
      const duration = Math.abs(position - currentFloor * 33) * 100;
      elevator.style.transition = `bottom ${duration}ms`;
      elevator.style.bottom = `${position}px`;
  
      setTimeout(() => {
        callback && callback();
      }, duration);
    }
  
    function updateElevator() {
      deltaTime = new Date().getTime() - previousTime;
      previousTime = new Date().getTime();
  
      requestAnimationFrame(updateElevator);
  
      if (elevatorStatus !== 'moving') {
        if (elevatorStatus === 'opening') {
          if (elevatorDoor.offsetWidth > 1) {
            elevatorDoor.style.width = (elevatorDoor.offsetWidth - 1) + 'px';
          } else {
            if (targetFloors.length === 0) {
              elevatorStatus = 'idle';
            } else {
              elevatorStatus = 'waiting';
              elevatorWaitingTime = 2000;
            }
          }
        }
        if (elevatorStatus === 'waiting') {
          if (elevatorWaitingTime > 0) {
            elevatorWaitingTime -= deltaTime;
          } else {
            elevatorStatus = 'closing';
          }
        }
        if (elevatorStatus === 'closing') {
          if (elevatorDoor.offsetWidth < 20) {
            elevatorDoor.style.width = (elevatorDoor.offsetWidth + 1) + 'px';
          } else {
            elevatorStatus = 'moving';
          }
        }
      }
  
      if (targetFloors[0] != null && elevatorStatus === 'moving') {
        if (targetFloors[0] * 33 > currentFloor * 33 - 7) {
          elevator.style.bottom = (parseInt(elevator.style.bottom) - 7 + 2) + 'px';
        } else {
          elevator.style.bottom = (parseInt(elevator.style.bottom) - 7 - 2) + 'px';
        }
      }
  
      updateButtons();
      updateDisplay();
    }
  
    function updateDisplay() {
      display.innerHTML = `Floor ${currentFloor}`;
    }
  
    function updateButtons() {
      upButtons.forEach(button => {
        const floor = parseInt(button.parentNode.getAttribute('id').replace('level', ''));
        if (targetFloors.includes(floor)) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
  
      downButtons.forEach(button => {
        const floor = parseInt(button.parentNode.getAttribute('id').replace('level', ''));
        if (targetFloors.includes(floor)) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
  
    updateElevator();
  });
  