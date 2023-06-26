import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { EpisodePageComponent } from './pages/episode-page/episode-page.component';

const routes: Routes = [
  {path: "", component: CharacterPageComponent},
  {path: 'character',  component: CharacterPageComponent},
  {path: 'location', component: LocationPageComponent},
  {path: 'episodes', component: EpisodePageComponent}
  // {path: 'episode', component: CharacterPageComponent}


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
