import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Character } from 'src/app/model/character';
import { RickandmortService } from 'src/app/services/rickandmort.service';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  animations: [
    trigger('hoverAnimation', [
      state('hovered', style({
        transform: 'scale(1.10)'
      })),
      state('notHovered', style({
        transform: 'scale(1)'
      })),
      transition('notHovered <=> hovered', animate('1ms ease-in-out'))
    ]),
    trigger('clickAnimation', [
      state('clicked', style({
        transform: 'rotateY(180deg)'
      })),
      state('notClicked', style({
        transform: 'rotateY(0deg)'
      })),
      transition('notClicked <=> clicked', animate('400ms ease-in-out'))
    ])
  ]
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

isHovered: boolean = false;
isClicked: boolean = false;

toggleHoverState() {
  if (!this.isClicked) {
    this.isHovered = !this.isHovered;
  }
}
  toggleClickState() {
    this.isClicked = !this.isClicked;
  }

  resetCardState() {
    if (!this.isClicked) {
      this.isHovered = false;
    }
  }

  getStatusColor(status: string | undefined) : string {
    if (status === 'Alive') {
      return 'green'; // Colore verde per stato 'Alive'
    } else if (status === 'Dead') {
      return 'red'; // Colore rosso per stato 'Dead'
    } else {
      return 'black'; // Colore di default per altri stati
    }
  }


}

