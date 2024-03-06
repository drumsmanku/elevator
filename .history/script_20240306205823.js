class Elevator {
    constructor() {
        this.currentFloor = 0;
        this.requests = [];
        this.moving = false;
    }

    requestFloor(floor) {
        if (!this.requests.includes(floor)) {
            this.requests.push(floor);
            this.requests.sort((a, b) => a - b); // Sort floors for efficiency
        }
        this.processRequests();
    }

    processRequests() {
        if (this.moving || this.requests.length === 0) return;
        this.moving = true;

        // Determine the direction of travel
        const nextFloor = this.requests.shift();
        const direction = nextFloor > this.currentFloor ? 'up' : 'down';

        // Simulate the time it takes to move between floors
        const travelTime = Math.abs(nextFloor - this.currentFloor) * 5000;
        setTimeout(() => {
            this.currentFloor = nextFloor;
            this.moving = false;
            console.log(`Elevator has arrived at floor ${this.currentFloor}`);
            this.processRequests();
        }, travelTime);
    }
}

// Usage
const elevator = new Elevator();
elevator.requestFloor(2); // Request to go to floor 2
elevator.requestFloor(1); // Request to go to floor 1
