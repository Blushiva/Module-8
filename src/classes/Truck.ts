// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

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
    color:string;
    make:string;
    model:string;
    year:number;
    weight:number;
    topSpeed:number;
    wheels:Wheel[];
    towingCapacity:number;
  }
  
    //Created a constructor that accepts the properties of the Truck class
    //The constructor calls the constructor of the parent class, Vehicle
  constructor(vin: string, color: string, make: string, model: string, year: number, weight: number, topSpeed: number, wheels: Wheel[], towingCapacity: number) {
    //calls the constructor of the parent class, Vehicle
    super(vin, color, make, model, year, weight, topSpeed);
    //wheels array has 4 elements and creates 4 new default Wheel objects if it does not
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    this.towingCapacity = towingCapacity;
  }
    

  // TODO: Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // TODO: Get the make an model of the vehicle if it exists
    // TODO: Check if the vehicle's weight is less than or equal to the truck's towing capacity
    // TODO: If it is, log that the vehicle is being towed
    // TODO: If it is not, log that the vehicle is too heavy to be towed
  }

  // TODO: Override the printDetails method from the Vehicle class
    // TODO: The method should call the printDetails method of the parent class
    // TODO: The method should log the details of the Truck
    // TODO: The details should include the VIN, make, model, year, weight, top speed, color, towing capacity, and wheels
}

// Export the Truck class as the default export
export default Truck;
