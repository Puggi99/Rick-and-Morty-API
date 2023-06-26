import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Result } from 'src/app/model/episodes';
import { RickandmortService } from 'src/app/services/rickandmort.service';

@Component({
  selector: 'app-episode-page',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.scss']
})
export class EpisodePageComponent {


  title = 'Rick and Morty Encyclopedia';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })
  public episodeList: Result[] = [];
  public episodes: Result[] = [];



  constructor(private rickandmortserv: RickandmortService) {


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
}
