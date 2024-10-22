

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

import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import { parse } from "path";

class Cli {
  vehicles: (Car | Truck | Motorbike)[] = [];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[] = []) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
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
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "frontWheelDiameter", message: "Enter Front Wheel Diameter" },
        { type: "input", name: "frontWheelBrand", message: "Enter Front Wheel Brand" },
        { type: "input", name: "rearWheelDiameter", message: "Enter Rear Wheel Diameter" },
        { type: "input", name: "rearWheelBrand", message: "Enter Rear Wheel Brand" },
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
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Select or create another vehicle",
            "Does this vehicle need to be towed?",
            "Can this vehicle do a wheelie?",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (!selectedVehicle) return;

        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;
          case "Start vehicle":
            selectedVehicle.start();
            break;
          case "Accelerate 5 MPH":
            selectedVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            selectedVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            selectedVehicle.stop();
            break;
          case "Turn right":
            selectedVehicle.turn("right");
            break;
          case "Turn left":
            selectedVehicle.turn("left");
            break;
          case "Reverse":
            selectedVehicle.reverse();
            break;
          case "Does this vehicle need to be towed?":
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
            } else {
              console.log("This vehicle cannot tow other vehicles.");
            }
            break;
          case "Can this vehicle do a wheelie?":
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log("This vehicle cannot do a wheelie.");
            }
            break;
          case "Select or create another vehicle":
            this.startCli();
            return;
          case "Exit":
            this.exit = true;
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        if (answers.vehicleToTow === truck) {
          console.log("The truck cannot tow itself.");
        } else {
          truck.tow(answers.vehicleToTow);
        }
        this.performActions();
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
