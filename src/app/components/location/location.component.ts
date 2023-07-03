import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RickandmortService } from 'src/app/services/rickandmort.service';
import { Location, Result } from 'src/app/model/location';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @Input()location?: Result;
  searchForm: FormGroup;
  locationList: any;
  constructor(private rickandmortserv: RickandmortService, private http: HttpClient, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
}



}
