import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Character } from 'src/app/model/character';
import { RickandmortService } from 'src/app/services/rickandmort.service';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class ComponentCharacter {
  @Input()character?: Character;
  searchForm: FormGroup;
  characterList: any;
  constructor(private rickandmortserv: RickandmortService, private http: HttpClient, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

//   ngOnInit() {
//     this.http.get<any>('https://rickandmortyapi.com/api/character/').subscribe(response => {
//       this.characterList = response.results.map((character: any) => character.name);
//     });
// }
}

