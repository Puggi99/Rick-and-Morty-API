import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RickandmortService } from 'src/app/services/rickandmort.service';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent {

  @Input() location?: Location

  title = 'Rick and Morty Encyclopedia';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  public locationList: Location[] = [];
  public locations: Location[] = []


  constructor(private rickandmortserv: RickandmortService) {


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


// changeThemes(){
//   document.body.classList.toggle('dark-mode');
//   this.isLight = !this.isLight;
// }


ngOnInit() {
  this.loadLocations();
}

// CHARACTER
loadLocations() {
  this.rickandmortserv.getLocation().subscribe({
    next: locations => this.locations = locations,
    error: err => console.log('Errore', err)
  })
}
}
