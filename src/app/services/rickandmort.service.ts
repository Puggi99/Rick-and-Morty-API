import { Injectable } from '@angular/core';
import { Observable, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class RickandmortService {
  pages: any;
  constructor(private http: HttpClient) {
  }

  readonly BASE_URL = "https://rickandmortyapi.com/api"


  getCharacters(name: string){
  return this.http.get<any>(this.BASE_URL + '/character/?page={{this.pages}}&name=' + name)
  }

  getCharactersName(name: string){
    return this.http.get<any>(this.BASE_URL + '/character/' + name)
    }

  getPages(): any{
    this.http.get<any>(this.BASE_URL + '/character').subscribe(data => {this.pages = data.info.pages, console.log(this.pages)})
   }

}
