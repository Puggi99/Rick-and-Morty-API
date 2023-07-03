import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Result } from 'src/app/model/episodes';
import { RickandmortService } from 'src/app/services/rickandmort.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-episode-page',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.scss']
})
export class EpisodePageComponent {


  title = 'Rick and Morty Encyclopedia';

  isPhone = false; // Proprietà per tenere traccia della modalità telefono
  isTablet = false; // Proprietà per tenere traccia della modalità tablet


  currentPage: number = 1;
  totalPages: number | undefined;


  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkView();
  }
  isMobile: boolean = false;
  public episodeList: Result[] = [];
  public episodes: Result[] = [];



  constructor(private rickandmortserv: RickandmortService, private breakpointObserver: BreakpointObserver) {


    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((data) => this.rickandmortserv.getEpisodes(data))
    ).subscribe(
      (data) => {
        this.episodeList = data!.results
      }
    )

    // this.changeThemes()
  }




  checkView() {
    const width = window.innerWidth;

    if (width <= 600  ) {
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

// changeThemes(){
//   document.body.classList.toggle('dark-mode');
//   this.isLight = !this.isLight;
// }


ngOnInit() {
  this.loadEpisodes();
}

// CHARACTER
loadEpisodes() {
  this.rickandmortserv.getEpisode().subscribe({
    next: episodes => this.episodes = episodes,
    error: err => console.log('Errore', err)
  })
}



loadNextPage(): void {
  this.currentPage++;
  this.rickandmortserv.getEpisodeByPage(this.currentPage).subscribe(
    (episodes) => {
      this.episodeList = episodes;
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
    this.rickandmortserv.getEpisodeByPage(this.currentPage).subscribe(
      (episodes) => {
        this.episodeList = episodes;
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
