// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import { parse } from "path";

// define the Cli class
  // updated the vehicles property to accept Truck and Motorbike objects as well
  // used the Union operator to define additional types for the array
  //See the AbleToTow interface for an example of how to use the Union operator
// These lines of code are part of a TypeScript class called [`Cli`]:
// class Cli {
// This line declares a class named [`Cli`] They encapsulate data and behavior into a single unit.
// vehicles: (Car | Truck | Motorbike)[] = [];
// This line declares a property named [`vehicles`] of type `(Car | Truck | Motorbike)[]`. 
// The `[]` indicates that [`vehicles`]is an array. The type `(Car | Truck | Motorbike)` 
// represents a union type, meaning that [`vehicles`]
// selectedVehicleVin: string | undefined;
// This line declares a property named [`selectedVehicleVin`] The [`string`]indicates that 
// [`selectedVehicleVin`] can store a string value, while [`undefined`] indicates that it can 
// also be assigned the value [`undefined`]. 
// This property is likely used to store the VIN (Vehicle Identification Number) of the currently selected vehicle.
// exit: boolean = false;
// This line declares a property named of EXIT of type boolean and initializes it with the value [`false`]. When [`exit`]is set to `true`, the program will terminate.
// Overall, these lines of code define properties within the [`Cli`] class 
// that are used to store information related to vehicles, the selected vehicle 
// VIN, and the exit condition of the CLI program.
//  vehicles: (Car | Truck | Motorbike)[] = [];
// selectedVehicleVin: string | undefined;
// exit: boolean = false;

  
class Cli {
  // Updated the constructor to accept Truck and Motorbike objects as well
  constructor(public vehicles: (Car | Truck | Motorbike)[]) {
  };
}

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          //Updated the choices array to include Truck and Motorbike
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') { 
          // create a truck
          this.createTruck();   
        } else if (answers.vehicleType === 'Motorbike') {    
          // create a motorbike
          this.createMotorbike(); 
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
            // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
            Cli.generateVin(),
            answers.color,
            answers.make,
            answers.model,
            parseInt(answers.year),
            parseInt(answers.weight),
            parseInt(answers.topSpeed),
            []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
          // Used the answers object to pass the required properties to the Truck constructor
        // pushed the truck to the vehicles array
        // set the selectedVehicleVin to the vin of the truck
        // performed actions on the truck

  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
            // The generateVin method is static and should be called using 
            //the class name Cli, make sure to use Cli.generateVin() for 
            //creating a truck and motorbike as well!
            Cli.generateVin(),
            answers.color,
            answers.make,
            answers.model,
            parseInt(answers.year),
            parseInt(answers.weight),
            parseInt(answers.topSpeed),
            parseInt(answers.towingCapacity),
            []
        );
        // push the truck to the vehicles array
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }



  // method to create a motorbike
  // Used the answers object to pass the required properties to the Motorbike constructor
  // pushed the motorbike to the vehicles array
  // set the selectedVehicleVin to the vin of the motorbike
  // performed actions on the motorbike

  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
          new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        // set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        this.performActions();
      });
  }

  // method to find a vehicle to tow 
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers) => {
        // check if the selected vehicle is the truck
        if (answers.vehicleToTow === truck) {
          console.log('The truck cannot tow itself.');
          // perform actions on the truck to allow the user to select another action
          this.performActions();
        } else {
          // tow the selected vehicle
          truck.tow(answers.vehicleToTow);
          // perform actions on the truck to allow the user to select another action
          this.performActions();
        }
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          // added options to tow and wheelie
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Does this vehicle need to be towed?',
            'Can this vehicle do a wheelie?',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('right');
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('left');
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
            }
          }
        }
        else if (answers.action === 'Does this vehicle need to be towed?') {
          // find the selected vehicle
          const selectedVehicle = this.vehicles.find((vehicle) => vehicle.vin === this.selectedVehicleVin);
          // check if the selected vehicle is a truck
          if (selectedVehicle instanceof Truck) {
            // perform tow action
            this.findVehicleToTow(selectedVehicle);
            return; // return to avoid instantly calling the performActions method again
          } else {
            console.log('This vehicle cannot tow other vehicles.');
          }
        }
        else if (answers.action === 'Can this vehicle do a wheelie?') {
          // find the selected vehicle
          const selectedVehicle = this.vehicles.find((vehicle) => vehicle.vin === this.selectedVehicleVin);
          // check if the selected vehicle is a motorbike
          if (selectedVehicle instanceof Motorbike) {
            // perform wheelie action
            selectedVehicle.doWheelie();
          } else {
            console.log('This vehicle cannot do a wheelie.');
          }
        }
        else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
