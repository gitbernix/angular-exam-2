import { Component, OnInit } from '@angular/core';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
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

    deleteMovie(movieId?: string): void {
        if (!movieId) {
            console.error('Movie ID is undefined');
            return;
        }
        this.movieService.deleteMovie(movieId).subscribe(() => {
            console.log('Movie deleted');
            this.movies$ = this.movieService.getMovies();
        });
    }

    ngOnInit(): void {
        this.movies$ = this.movieService.getMovies();
    }
}
