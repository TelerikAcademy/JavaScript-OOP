module Drivers {
    export class CarDriver extends BasePerson implements Person, Driver {
        private static LicenseNumber: string = '1234-5678';

        private _health: number;

        vehicles: Vehicle[];

        constructor(firstName: string, lastName: string, age: number, public yearsExperience: number) {
            super(firstName, lastName, age);
            this.health = 100;
        }

        get health() {
            return this._health;
        }

        set health(newHealth: number) {
            if (newHealth < 0 || newHealth > 100) {
                throw new Error('Health must be less than 0 and bigger than 100');
            }

            this._health = newHealth;
        }

        static CurrentLicenseNumber(): string {
            return this.LicenseNumber;
        }

        addVehicle(vehicle: Vehicle) {
            this.vehicles.push(vehicle);
        }

        removeVehicle(vehicle: Vehicle): Vehicle {
            var vehicleIndex = this.vehicles.indexOf(vehicle);
            if (vehicleIndex < 0) {
                throw new Error('Vehicle was not found');
            }

            var vehicleToRemove = this.vehicles[vehicleIndex];
            this.vehicles[vehicleIndex] = this.vehicles[this.vehicles.length - 1];
            this.vehicles.pop();

            return vehicleToRemove;
        }

        greet(): string {
            return super.greet() + ' and having ' + this.yearsExperience + ' years experience';
        }
    } 
}

var someDriver = new Drivers.CarDriver('Ivaylo', 'Kenov', 24, 10);
var greeting = someDriver.greet();
console.log(greeting);