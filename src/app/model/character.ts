export interface Character {
  episode: string[]
  url: string
  type: string
  gender: string
  created: string
  id: number
  name: string
  status: string
  species: string
  origin: Origin
  location: Location
  image: string

}


export interface Location {
  name: string
  url: string
}

export interface Origin {
  name: string
  url: string
}
