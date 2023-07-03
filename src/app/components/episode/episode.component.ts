import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Result, Info } from 'src/app/model/episodes';
import { RickandmortService } from 'src/app/services/rickandmort.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {
  @Input()episode?: Result;
  searchForm: FormGroup;
  locationList: any;
  constructor(private rickandmortserv: RickandmortService, private http: HttpClient, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
}
}
