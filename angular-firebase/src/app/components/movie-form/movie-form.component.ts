import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
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

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.movieForm = new FormGroup({
            title: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                // this.brandNameValidator,
            ]),
            genres: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            releaseDate: new FormControl('', [
                Validators.required,
                Validators.min(1900),
                Validators.max(2024),
            ]),
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            country: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
        });
    }

    get title() {
        return this.movieForm.get('title');
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

    // brandNameValidator(control: AbstractControl): ValidationErrors | null {
    //     const controlValue = control.value as string;

    //     if (controlValue != null) {
    //         return controlValue.match(/trabant/i)
    //             ? {
    //                   brandName: {
    //                       value: control.value + ' Error: contain trabant',
    //                   },
    //               }
    //             : null;
    //     }

    //     return null;
    // }

    ngOnDestroy(): void {
        if (this.subSaveMovie) {
            this.subSaveMovie.unsubscribe();
        }
    }
}
