import { Component, HostListener, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Character, CharacterInfo } from 'src/app/model/character';
import { RickandmortService } from 'src/app/services/rickandmort.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss'],

})
export class CharacterPageComponent {
  @Input() character?: Character
  @Input() characterInfo?: CharacterInfo


  isPhone = false; // Proprietà per tenere traccia della modalità telefono
  isTablet = false; // Proprietà per tenere traccia della modalità tablet

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkView();
  }
  isMobile: boolean = false;
  currentPage: number = 1;
  totalPages: number | undefined;
  notFound: boolean = false

  title = 'Rick and Morty Encyclopedia';

  searchTerm = ''
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  public characterList: Character[] = [];
  public characters: Character[] = []


  constructor(private http: HttpClient, private rickandmortserv: RickandmortService, private breakpointObserver: BreakpointObserver) {


    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((data) => this.rickandmortserv.getCharacters(data))
    ).subscribe(
      (data) => {
        this.characterList = data!.results
      }
    )

  }

  onSearch() {
    const searchTerm = this.searchForm.get('search')?.value?.trim().toLowerCase() || '';
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.loadCharacters();

    if (searchTerm === 'dead' || searchTerm === 'alive' || searchTerm === 'unknown') {
      const url = `https://rickandmortyapi.com/api/character?status=${searchTerm}`;
      this.http.get<any>(url)
        .subscribe(data => {
          this.characterList = data.results;
          this.notFound = this.characterList.length === 0; // Aggiunta della verifica per notFound
        });
    } else if (searchTerm) {
      this.rickandmortserv.getCharacters(searchTerm).subscribe(
        (data) => {
          this.characterList = data.results;
          this.notFound = this.characterList.length === 0; // Aggiunta della verifica per notFound
        },
        (error) => {
          console.log('Non ho trovato nessuno', error);
          this.characterList = [];
          this.notFound = true;
        }
      );
    } else {
      this.characterList = [];
      this.currentPage = 1;
      this.notFound = false;
    }
  }







  checkView() {
    const width = window.innerWidth;

    if (width <= 590) {
      this.isPhone = true; // Modalità telefono
      this.isTablet = false; // Non è modalità tablet
    } else if (width > 480 && width <= 1200) {
      this.isPhone = false; // Non è modalità telefono
      this.isTablet = true; // Modalità tablet
    } else {
      this.isPhone = false; // Non è modalità telefono
      this.isTablet = false; // Non è modalità tablet
    }
  }


  ngOnInit() {
    this.checkView()
    this.loadCharacters();


  }

  // CHARACTER
  loadCharacters() {
    this.rickandmortserv.getCharacter().subscribe({
      next: characters => this.characters = characters,
      error: err => console.log('Errore', err)
    })
  }


  loadNextPage(): void {
    this.currentPage++;
    this.rickandmortserv.getCharactersByPage(this.currentPage).subscribe(
      (characters) => {
        this.characterList = characters;
      },
      (error) => {
        console.log('Errore nel caricamento della pagina:', error);
        this.currentPage--; // Ripristina il numero di pagina precedente in caso di errore
      }
    );
  }

  loadPreviousPage(): void {
    if (this.currentPage >= 1) {
      this.currentPage--
      this.rickandmortserv.getCharactersByPage(this.currentPage).subscribe(
        (characters) => {
          this.characterList = characters;
        },
        (error) => {
          console.log('Errore nel caricamento della pagina:', error);
          this.currentPage--; // Ripristina il numero di pagina precedente in caso di errore
        }
      );
      if (this.currentPage <= 1) {
        this.currentPage = 1
      }
    } else {
      this.currentPage = 1
    }
  }

}
