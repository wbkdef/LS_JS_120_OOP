
console.log(`\n ----------------------- Make Car Factory ----------------------- `);
function createCar(make, fuelLevel, engineOn) {
  // To be implemented by you.
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  };
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();
console.log(raceCar1);

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();
console.log(raceCar2);

