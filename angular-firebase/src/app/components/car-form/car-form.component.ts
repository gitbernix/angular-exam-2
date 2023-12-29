import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
    selector: 'app-car-form',
    templateUrl: './car-form.component.html',
    styleUrls: ['./car-form.component.css'],
})
export class CarFormComponent implements OnInit, OnDestroy {
    carForm!: FormGroup;
    subSaveCar?: Subscription;
    message: string = '';

    constructor(private carService: CarService) {}

    ngOnInit(): void {
        this.carForm = new FormGroup({
            brand: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                this.brandNameValidator,
            ]),
            model: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            year: new FormControl('', [
                Validators.required,
                Validators.min(1900),
                Validators.max(2024),
            ]),
            country: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            damaged: new FormControl('', [Validators.required]),
            color: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
            ]),
        });
    }

    get brand() {
        return this.carForm.get('brand');
    }

    get model() {
        return this.carForm.get('model');
    }

    get year() {
        return this.carForm.get('year');
    }

    get country() {
        return this.carForm.get('country');
    }

    get damage() {
        return this.carForm.get('damage');
    }

    get color() {
        return this.carForm.get('color');
    }

    saveCar() {
        if (!this.carForm.valid) {
            return;
        }
        const carToSave = this.carForm.value;
        console.log(carToSave);
        this.subSaveCar = this.carService.addCar(carToSave).subscribe({
            next: (docRef) => {
                console.log('Car saved with id: ', docRef['id']);
                this.message = 'Success! Your car has been submitted.';
            },
            error: (err) => {
                console.log(err);
                this.message = 'Error! Your car has not been submitted.';
            },
            complete: () => {
                console.log('Done!');
            },
        });
        this.carForm.reset();
    }

    brandNameValidator(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string;

        if (controlValue != null) {
            return controlValue.match(/trabant/i)
                ? {
                      brandName: {
                          value: control.value + ' Error: contain trabant',
                      },
                  }
                : null;
        }

        return null;
    }

    ngOnDestroy(): void {
        if (this.subSaveCar) {
            this.subSaveCar.unsubscribe();
        }
    }
}
