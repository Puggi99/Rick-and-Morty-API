import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ComponentCharacter } from './components/character/character.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { LocationComponent } from './components/location/location.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { EpisodePageComponent } from './pages/episode-page/episode-page.component';
import { EpisodeComponent } from './components/episode/episode.component';


@NgModule({
  declarations: [
    AppComponent,
    ComponentCharacter,
    LocationPageComponent,
    LocationComponent,
    CharacterPageComponent,
    EpisodeComponent,
    EpisodePageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    DatePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
