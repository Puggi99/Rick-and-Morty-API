import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Result } from 'src/app/model/location';
import { RickandmortService } from 'src/app/services/rickandmort.service';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent {


  title = 'Rick and Morty Encyclopedia';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })
  public locationList: Result[] = [];
  public locations: Result[] = [];



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
    next: location => this.locations = location,
    error: err => console.log('Errore', err)
  })
}
}
