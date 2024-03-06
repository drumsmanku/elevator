document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    let requestAtLevel1 = null; // null, 'up', or 'down'

    // Bind button events
    document.getElementById('up0').addEventListener('click', () => moveToLevel1());
    document.getElementById('up1').addEventListener('click', () => requestAtLevel1 = 'up');
    document.getElementById('down1').addEventListener('click', () => requestAtLevel1 = 'down');
    document.getElementById('down2').addEventListener('click', () => moveToGroundFromLevel2());

    function moveToLevel1() {
        elevator.style.transition = 'bottom 5s';
        elevator.style.bottom = '33.3%'; // Move to Level 1

        setTimeout(() => {
            if (requestAtLevel1 === 'up') {
                moveToLevel2();
            } else {
                requestAtLevel1 = null; // Reset request
            }
        }, 5000); // Check after 5 seconds
    }

    function moveToLevel2() {
        elevator.style.transition = 'bottom 5s';
        elevator.style.bottom = '66.6%'; // Move to Level 2

        requestAtLevel1 = null; // Reset request
    }

    function moveToGroundFromLevel2() {
        if (requestAtLevel1 === 'down') {
            elevator.style.transition = 'bottom 5s';
            elevator.style.bottom = '33.3%';

            setTimeout(() => {
                moveToGround();
            }, 5000); // Move to Ground after stopping at Level 1
        } else {
            moveToGround();
        }
    }

    function moveToGround() {
        elevator.style.transition = 'bottom 5s';
        elevator.style.bottom = '0%'; // Move to Ground

        requestAtLevel1 = null; // Reset any request at Level 1
    }
});
