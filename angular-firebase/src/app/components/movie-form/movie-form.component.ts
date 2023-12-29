import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie-form',
    templateUrl: './movie-form.component.html',
    styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit, OnDestroy {
    movieForm!: FormGroup;
    subSaveMovie?: Subscription;
    message: string = '';

    genresOptions: { key: string; value: string }[] = [
        { key: 'SCI-FI', value: 'Sci-fi' },
        { key: 'COMEDY', value: 'Comedy' },
        { key: 'THRILLER', value: 'Thriller' },
        { key: 'FANTASY', value: 'Fantasy' },
        { key: 'DRAMA', value: 'Drama' },
        { key: 'CRIME', value: 'Crime' },
        { key: 'ADVENTURE', value: 'Adventure' },
        { key: 'HORROR', value: 'Horror' },
        { key: 'ACTION', value: 'Action' },
        { key: 'OTHER', value: 'Other' },
    ];

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.movieForm = new FormGroup({
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
            director: new FormControl('', [
                Validators.required,
                this.directorValidator(),
            ]),
            duration: new FormControl(null, [
                Validators.required,
                Validators.min(10),
                Validators.max(350),
            ]),
            genres: new FormControl(''),

            releaseDate: new FormControl(null, [
                Validators.required,
                Validators.min(1970),
                Validators.max(2023),
            ]),

            description: new FormControl('', [
                Validators.required,
                Validators.minLength(20),
                Validators.maxLength(800),
                this.pornValidator(),
            ]),

            country: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
            ]),
        });
    }

    get title() {
        return this.movieForm.get('title');
    }

    get director() {
        return this.movieForm.get('director');
    }

    get duration() {
        return this.movieForm.get('duration');
    }

    get genres() {
        return this.movieForm.get('genres');
    }

    get releaseDate() {
        return this.movieForm.get('releaseDate');
    }

    get description() {
        return this.movieForm.get('description');
    }

    get country() {
        return this.movieForm.get('country');
    }

    saveMovie() {
        if (!this.movieForm.valid) {
            return;
        }
        const movieToSave = this.movieForm.value;
        console.log(movieToSave);
        this.subSaveMovie = this.movieService.saveMovie(movieToSave).subscribe({
            next: (docRef) => {
                console.log('Movie saved with id: ', docRef['id']);
                this.message = 'Success! Your movie has been submitted.';
            },
            error: (err) => {
                console.log(err);
                this.message = 'Error! Your movie has not been submitted.';
            },
            complete: () => {
                console.log('Done!');
            },
        });
        this.movieForm.reset();
    }

    //Egyedi validátorok:
    pornValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const hasPorn = (control.value as string).match(/porn/i);
            return hasPorn ? { customError: { value: control.value } } : null;
        };
    }

    directorValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (typeof value !== 'string') {
                return { director: true };
            }
            const valid = value.match(/^[A-Za-z\s]{3,20}$/);
            return valid ? null : { director: true };
        };
    }

    ngOnDestroy(): void {
        if (this.subSaveMovie) {
            this.subSaveMovie.unsubscribe();
        }
    }
}
