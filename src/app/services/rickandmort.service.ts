import { Injectable } from '@angular/core';
import { Observable, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../model/character';
import { Result } from '../model/location';
import { Episode } from '../model/episodes';

@Injectable({
  providedIn: 'root'
})
export class RickandmortService {
  // pages: any;
  constructor(private http: HttpClient) {
  }

  readonly BASE_URL = "https://rickandmortyapi.com/api"


  getCharacters(name: string){
  return this.http.get<any>(this.BASE_URL + '/character/?page={{this.pages}}&name=' + name)
  }

  getCharacter(): Observable<Character[]> {
    return this.http.get<any>(this.BASE_URL + '/character' + '?page=' + 1).pipe(
      switchMap(character => {
        const results = character.results;
        const getArray = [];
        getArray.push(results);
        return getArray
      })
    )
  }

  getLocation(): Observable<Result[]> {
    return this.http.get<any>(this.BASE_URL + '/location' + '?page=' + 1).pipe(
      switchMap(location => {
        const results = location.results;
        const getArray = [];
        getArray.push(results);
        return getArray
      })
    )
  }


  getLocations(name: string){
    return this.http.get<any>(this.BASE_URL + '/location/?page={{this.pages}}&name=' + name)
    }





  // getPages(): any{
  //   this.http.get<any>(this.BASE_URL + '/character').subscribe(data => {this.pages = data.info.pages, console.log(this.pages)})
  //  }

  getEpisode(): Observable<Episode[]> {
    return this.http.get<any>(this.BASE_URL + '/episode' + '?page=' + 1).pipe(
      switchMap(episode => {
        const results = episode.results;
        const getArray = [];
        getArray.push(results);
        return getArray
      })
    )
  }


  getEpisodes(name: string){
    return this.http.get<any>(this.BASE_URL + '/episode/?page={{this.pages}}&name=' + name)
    }

    getCharactersByPage(page: number): Observable<Character[]> {
      const url = `${this.BASE_URL + '/character'}?page=${page}`;
      return this.http.get<any>(url).pipe(
        switchMap(character => {
          const results = character.results;
          const getArray = [];
          getArray.push(results);
          return getArray;
        })
      );
    }

    getLocationByPage(page: number): Observable<Result[]> {
      const url = `${this.BASE_URL + '/location'}?page=${page}`;
      return this.http.get<any>(url).pipe(
        switchMap(locations => {
          const results = locations.results;
          const getArray = [];
          getArray.push(results);
          return getArray;
        })
      );
    }

    getEpisodeByPage(page: number): Observable<Episode[]> {
      const url = `${this.BASE_URL + '/episode'}?page=${page}`;
      return this.http.get<any>(url).pipe(
        switchMap(episode => {
          const results = episode.results;
          const getArray = [];
          getArray.push(results);
          return getArray;
        })
      );
    }
}

