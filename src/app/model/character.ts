export interface Character {
  episode: string[];
  url: string;
  type: string;
  gender: string;
  created: string;
  id: number;
  name: string;
  status: string;
  species: string;
  origin: Origin;
  location: Location;
  image: string;
  locationName: string; // Aggiunta di una nuova proprietà per il nome della location
  originName: string; // Aggiunta di una nuova proprietà per il nome dell'origin
}


export interface Location {
  name: string
  url: string
}

export interface Origin {
  name: string
  url: string
}


export interface CharacterInfo {
  count: number
  pages: number
  next: string
  prev: any
}
