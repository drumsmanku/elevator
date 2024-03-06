document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const elevatorDoor = elevator.querySelector('.elevator-door');
    const elevatorLight = elevator.querySelector('.elevator-light');
    const floors = document.querySelectorAll('.building .floor');
    const buttons = document.querySelectorAll('.handle button');
    const display = document.querySelector('.display');

    let destinyFloors = [];
    let currentFloor = null;
    let leavingFloor = false;
    let elevatorStatus = 'idle';
    let elevatorWaitingTime = 2000;
    let elevatorWaitTime = 2000;
    let previousTime = new Date().getTime();
    let deltaTime = 0;

    elevatorDoor.style.width = '1px';
    elevator.style.bottom = floors[0].offsetTop + 'px';

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const setFloor = this.getAttribute('data-set-floor');
            const selectedFloor = Array.prototype.slice
                .apply(document.querySelectorAll('.building .floor'))
                .filter((f) => f.getAttribute('data-floor') == setFloor)[0];

            if (
                destinyFloors.find(
                    (df) => df.getAttribute('data-floor') == selectedFloor.getAttribute('data-floor')
                ) == null
            ) {
                if (selectedFloor.getAttribute('data-floor') != currentFloor.getAttribute('data-floor')) {
                    destinyFloors.push(selectedFloor);
                }
            }
            leavingFloor = true;
            if (elevatorStatus == 'idle') {
                elevatorStatus = 'closing';
            }
        });
    });

    function updateElevator() {
        deltaTime = new Date().getTime() - previousTime;
        previousTime = new Date().getTime();

        requestAnimationFrame(updateElevator);

        let elevatorWithinFloor = false;
        for (let i = 0; i < floors.length; i++) {
            if (
                elevator.offsetTop > floors[i].offsetTop &&
                elevator.offsetTop < floors[i].offsetTop + 10
            ) {
                elevatorWithinFloor = true;
                currentFloor = floors[i];

                if (!leavingFloor) {
                    if (
                        destinyFloors.some(
                            (df) =>
                                df.getAttribute('data-floor') ==
                                currentFloor.getAttribute('data-floor')
                        )
                    ) {
                        destinyFloors = destinyFloors.filter(
                            (df) =>
                                df.getAttribute('data-floor') !=
                                currentFloor.getAttribute('data-floor')
                        );
                        elevatorStatus = 'opening';
                    }
                }
            }
        }

        if (!elevatorWithinFloor) {
            if (leavingFloor) {
                leavingFloor = false;
            }
        }

        if (elevatorStatus != 'moving') {
            if (elevatorStatus == 'opening') {
                if (elevatorDoor.offsetWidth > 1) {
                    elevatorDoor.style.width = elevatorDoor.offsetWidth - 1 + 'px';
                } else {
                    if (destinyFloors.length == 0) {
                        elevatorStatus = 'idle';
                    } else {
                        elevatorStatus = 'waiting';
                        elevatorWaitingTime = elevatorWaitTime;
                    }
                }
            }
            if (elevatorStatus == 'waiting') {
                if (elevatorWaitingTime > 0) {
                    elevatorWaitingTime -= deltaTime;
                } else {
                    elevatorStatus = 'closing';
                }
            }
            if (elevatorStatus == 'closing') {
                if (elevatorDoor.offsetWidth < 34) {
                    elevatorDoor.style.width = elevatorDoor.offsetWidth + 1 + 'px';
                } else {
                    elevatorStatus = 'moving';
                }
            }
        }

        if (destinyFloors[0] != null && elevatorStatus == 'moving') {
            if (destinyFloors[0].offsetTop > elevator.offsetTop - 7) {
                elevator.style.bottom = elevator.offsetTop - 7 + 2 + 'px';
            } else {
                elevator.style.bottom = elevator.offsetTop - 7 - 2 + 'px';
            }
        }

        updateButtons();
        updateDisplay();
    }
    updateElevator();

    function updateDisplay() {
        display.innerHTML =
            [
                'Térreo',
                'Primeiro Andar',
                'Segundo Andar',
                'Terceiro Andar',
                'Quarto Andar',
                'Quinto Andar',
                'Sexto Andar',
            ][parseInt(currentFloor.getAttribute('data-floor'))] +
            ' ' +
            (destinyFloors[0] != null
                ? destinyFloors[0].offsetTop < currentFloor.offsetTop
                    ? '<br />Subindo'
                    : '<br />Descendo'
                : '');
    }

    function updateButtons() {
        buttons.forEach((button) => {
            if (
                destinyFloors.find(
                    (df) => df.getAttribute('data-floor') == button.getAttribute('data-set-floor')
                )
            ) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
});
