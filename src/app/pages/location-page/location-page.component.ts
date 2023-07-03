import { Component, HostListener, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Result } from 'src/app/model/location';
import { RickandmortService } from 'src/app/services/rickandmort.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent {


  title = 'Rick and Morty Encyclopedia';

  isPhone = false; // Proprietà per tenere traccia della modalità telefono
  isTablet = false; // Proprietà per tenere traccia della modalità tablet

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })


  currentPage: number = 1;
  totalPages: number | undefined;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkView();
  }
  isMobile: boolean = false;
  public locationList: Result[] = [];
  public locations: Result[] = [];



  constructor(private rickandmortserv: RickandmortService, private breakpointObserver: BreakpointObserver) {


    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((data) => this.rickandmortserv.getLocations(data))
    ).subscribe(
      (data) => {
        this.locationList = data!.results
      }
    )

    // this.changeThemes()
  }



  checkView() {
    const width = window.innerWidth;

    if (width <= 590  ) {
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
  this.checkView()
  this.loadLocations();
}

// CHARACTER
loadLocations() {
  this.rickandmortserv.getLocation().subscribe({
    next: location => this.locations = location,
    error: err => console.log('Errore', err)
  })
}


loadNextPage(): void {
  this.currentPage++;
  this.rickandmortserv.getLocationByPage(this.currentPage).subscribe(
    (locations) => {
      this.locations = locations;
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
    this.rickandmortserv.getLocationByPage(this.currentPage).subscribe(
      (locations) => {
        this.locationList = locations;
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
