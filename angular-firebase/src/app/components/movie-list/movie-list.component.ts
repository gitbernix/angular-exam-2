import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
    movies$: Observable<MovieModel[]> = new Observable();

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.movies$ = this.movieService.getMovies();
    }
}
