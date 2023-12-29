import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'car-form', component: CarFormComponent },
    { path: 'car-list', component: CarListComponent },
    { path: 'movie-form', component: MovieFormComponent },
    { path: 'movie-list', component: MovieListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
