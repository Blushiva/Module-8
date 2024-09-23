// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle';
import Motorbike from './Motorbike';
import Car from './Car';
import Wheel from './Wheel';
import AbleToTow from '../interfaces/AbleToTow';

  // Declared properties of the Truck class and implemented the tow method from the AbleToTow interface
  // declared the properties to include vin, 
  //color, make, model, year, weight, 
  //top speed, wheels, and towing capacity
  //The types should be as follows: vin (string), color (string), 
  //make (string), model (string), year (number), weight (number),
  // topSpeed (number), wheels (Wheel[]), towingCapacity (number)
  


    
  //declared truck class
  class Truck extends Vehicle implements AbleToTow {
    //declared the properties to include the above
    vin: string;
    color: string;
    make: string;
    model: string;
    year: number;
    weight: number;
    topSpeed: number;
    wheels: Wheel[];
    towingCapacity: number;
  
    //Created a constructor that accepts the properties of the Truck class
    //The constructor calls the constructor of the parent class, Vehicle
    //wheels array has 4 elements and creates 4 new default Wheel objects if it does not
    //look at the car.ts file for reference
  
    constructor(
      vin: string,
      color: string,
      make: string,
      model: string,
      year: number,
      weight: number,
      topSpeed: number,
      wheels: Wheel[],
      towingCapacity: number
    ) {
      super(vin, color, make, model, year, weight, topSpeed);
      this.vin = vin;
      this.color = color;
      this.make = make;
      this.model = model;
      this.year = year;
      this.weight = weight;
      this.topSpeed = topSpeed;
      this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
      this.towingCapacity = towingCapacity;
  
      if (vin === undefined) {
        this.vin = 'DEFAULT_VIN'; // Assign a default VIN value
      } else {
        console.log(`Vehicle VIN: ${vin}`);
      }
    }
  
    // Implemented the tow method from the AbleToTow interface
    tow(vehicle: Truck | Motorbike | Car): void {
      // Get the make and model of the vehicle if it exists
      const make = vehicle.make;
      const model = vehicle.model;
  
      // Checked if the vehicle's weight is less than or equal to the truck's towing capacity
      if (vehicle.weight <= this.towingCapacity) {
        // If it is, log that the vehicle is being towed
        console.log(`Towing ${make} ${model}`);
      } else {
        // If not, logged that the vehicle is too heavy to be towed
        console.log(`Vehicle is too heavy to be towed`);
      }
    }
  
    // Override the printDetails method from the Vehicle class
    printDetails(): void {
      // Call the printDetails method of the parent class
      super.printDetails();
  
      // Log the details of the Truck
      console.log(`VIN: ${this.vin}`);
      console.log(`Make: ${this.make}`);
      console.log(`Model: ${this.model}`);
      console.log(`Year: ${this.year}`);
      console.log(`Weight: ${this.weight}`);
      console.log(`Top Speed: ${this.topSpeed}`);
      console.log(`Color: ${this.color}`);
      console.log(`Towing Capacity: ${this.towingCapacity}`);
      console.log(`Wheels: ${this.wheels.length}`);
    }
  }
  
  // Export the Truck class as the default export
  export default Truck;
