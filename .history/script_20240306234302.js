document.addEventListener('DOMContentLoaded', () => {
    const elevator = document.getElementById('elevator');
    const FLOOR_HEIGHT = window.innerHeight / 3; 
    let queue = []; 
    let currentFloor = 0; 
    let moving = false; 

   
    document.getElementById('up0').addEventListener('click', () => addToQueue(2));
    document.getElementById('up1').addEventListener('click', () => {stopAtOneWhileGoingUp(); keepMovingToLevel2();});
    document.getElementById('down1').addEventListener('click', () => {stopAtOneWhileComingDown(); keepMovingToLevel0();});
    document.getElementById('down2').addEventListener('click', () => addToQueue(0));

    function addToQueue(floor) {
        if (!queue.includes(floor)) {
            queue.push(floor);
            processQueue();
        }
    }
    function stopAtOneWhileGoingUp(){
        if(currentFloor === 0 && moving){
            moveElevatorTo(1)
        }
    }
    function keepMovingToLevel2(){
        if(currentFloor === 1 && !moving){
            moveElevatorTo(2)
        }
    }
    function keepMovingToLevel0(){
        if(currentFloor === 1 && !moving){
            moveElevatorTo(0)
        }
    }
    function stopAtOneWhileComingDown(){
        if(currentFloor === 2 && moving){
            moveElevatorTo(1)
        }
    }
    function processQueue() {
        if (moving || queue.length === 0) return;
        const nextFloor = queue.shift(); 
        moveElevatorTo(nextFloor);
    }

    function moveElevatorTo(floor) {
        moving = true;
        const duration = Math.abs(floor - currentFloor) * 5000; 
        elevator.style.transition = `bottom ${duration}ms`;
        elevator.style.bottom = `${floor * FLOOR_HEIGHT}px`;

        setTimeout(() => {
            currentFloor = floor;
            moving = false;
            processQueue(); 
        }, duration);
    }
});
