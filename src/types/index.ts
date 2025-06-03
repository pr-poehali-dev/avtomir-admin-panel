export interface Car {
  id: string;
  brand: string;
  model: string;
  transmission: "manual" | "automatic" | "robot";
  bodyType: "sedan" | "liftback" | "hatchback" | "truck";
  engineType: "petrol" | "diesel" | "electric";
  driveType: "front" | "rear" | "all";
  horsepower: number;
  acceleration: number; // 0-100 km/h in seconds
  year: number;
  engineVolume: number; // in liters
  createdAt: Date;
}

export interface Order {
  id: string;
  phoneNumber: string;
  carId: string;
  carBrand: string;
  carModel: string;
  createdAt: Date;
  status: "created" | "reviewing" | "in_transit" | "cancelled" | "completed";
}

export type OrderStatus = Order["status"];
export type TransmissionType = Car["transmission"];
export type BodyType = Car["bodyType"];
export type EngineType = Car["engineType"];
export type DriveType = Car["driveType"];
