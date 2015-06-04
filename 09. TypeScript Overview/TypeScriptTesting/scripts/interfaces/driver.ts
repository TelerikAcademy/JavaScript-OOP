 interface Driver extends Person {
     yearsExperience: number;
     vehicles: Vehicle[];
     addVehicle(vehicle: Vehicle): void;
     removeVehicle(vehicle: Vehicle): Vehicle;
 }