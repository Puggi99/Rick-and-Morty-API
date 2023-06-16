import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'location-page', component: LocationPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
