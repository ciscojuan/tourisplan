import { City } from "./planesTuristicos.response";

export interface PlanTuristico{
    id: number,
    name: string,
    description: string,
    images: string[],
    latitude: string,
    longitude: string,
    cityId: number,
    city: City
}