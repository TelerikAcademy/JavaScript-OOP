var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Drivers;
(function (Drivers) {
    var CarDriver = (function (_super) {
        __extends(CarDriver, _super);
        function CarDriver(firstName, lastName, age, yearsExperience) {
            _super.call(this, firstName, lastName, age);
            this.yearsExperience = yearsExperience;
            this.health = 100;
        }
        Object.defineProperty(CarDriver.prototype, "health", {
            get: function () {
                return this._health;
            },
            set: function (newHealth) {
                if (newHealth < 0 || newHealth > 100) {
                    throw new Error('Health must be less than 0 and bigger than 100');
                }

                this._health = newHealth;
            },
            enumerable: true,
            configurable: true
        });


        CarDriver.CurrentLicenseNumber = function () {
            return this.LicenseNumber;
        };

        CarDriver.prototype.addVehicle = function (vehicle) {
            this.vehicles.push(vehicle);
        };

        CarDriver.prototype.removeVehicle = function (vehicle) {
            var vehicleIndex = this.vehicles.indexOf(vehicle);
            if (vehicleIndex < 0) {
                throw new Error('Vehicle was not found');
            }

            var vehicleToRemove = this.vehicles[vehicleIndex];
            this.vehicles[vehicleIndex] = this.vehicles[this.vehicles.length - 1];
            this.vehicles.pop();

            return vehicleToRemove;
        };

        CarDriver.prototype.greet = function () {
            return _super.prototype.greet.call(this) + ' and having ' + this.yearsExperience + ' years experience';
        };
        CarDriver.LicenseNumber = '1234-5678';
        return CarDriver;
    })(Drivers.BasePerson);
    Drivers.CarDriver = CarDriver;
})(Drivers || (Drivers = {}));

var someDriver = new Drivers.CarDriver('Ivaylo', 'Kenov', 24, 10);
var greeting = someDriver.greet();
console.log(greeting);
//# sourceMappingURL=carDriver.js.map
