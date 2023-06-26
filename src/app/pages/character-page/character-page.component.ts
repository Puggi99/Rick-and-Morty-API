import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Character } from 'src/app/model/character';
import { RickandmortService } from 'src/app/services/rickandmort.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent {
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
