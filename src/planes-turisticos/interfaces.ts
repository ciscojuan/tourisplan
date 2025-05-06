// Interfaces for the API response
export interface City {
  id: number;
  name: string;
  description?: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
}

export interface PlanTuristico {
  id: number;
  name: string;
  description?: string;
  images: string[];
  city?: City;
  department?: Department;
}

// The API returns an array of PlanTuristico
export type PlanesTuristicos = PlanTuristico[];