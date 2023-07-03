import { Component, Input, OnInit } from '@angular/core';
import { RickandmortService } from './services/rickandmort.service';
import { FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Observable, switchMap, forkJoin, debounceTime, distinctUntilChanged } from 'rxjs';
import { Character } from './model/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
@Input() character?: Character
  isLight = false

  title = 'Rick and Morty Encyclopedia';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  public characterList: Character[] = [];
  public characters: Character[] = []



  constructor(private rickandmortserv: RickandmortService) {

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((data) => this.rickandmortserv.getCharacters(data))
    ).subscribe(
      (data) => {
        this.characterList = data!.results
      }
    )

    // this.changeThemes()
  }


// changeThemes(){
//   document.body.classList.toggle('dark-mode');
//   this.isLight = !this.isLight;
// }


ngOnInit() {
  this.loadCharacters();
}

// CHARACTER
loadCharacters() {
  this.rickandmortserv.getCharacter().subscribe({
    next: characters => this.characters = characters,
    error: err => console.log('Errore', err)
  })
}

}
