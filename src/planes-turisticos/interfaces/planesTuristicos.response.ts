export interface PlanesTuristicos {
    id:          number;
    name:        string;
    description: string;
    images:      string[];
    latitude:    string;
    longitude:   string;
    cityId:      number;
    city:        City;
}

export interface City {
    id:                     number;
    name:                   string;
    description:            string;
    surface:                number | null;
    population:             number | null;
    postalCode:             null | string;
    departmentId:           number;
    department:             null;
    touristAttractions:     null[];
    presidents:             null;
    indigenousReservations: null;
    airports:               null;
    radios:                 null;
}
