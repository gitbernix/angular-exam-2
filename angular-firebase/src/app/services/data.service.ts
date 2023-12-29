import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor() {}

    test() {
        console.log('test');
    }

    getNewCars$(): Observable<any> {
        return of([
            {
                type: 'Tesla',
                model: '3',
                year: 2022,
            },
            {
                type: 'BMW',
                model: 'i3',
                year: 2023,
            },
            {
                type: 'Mercedes',
                model: 'EQS',
                year: 2023,
            },
        ]);
    }

    getUsedCars$(): Observable<any> {
        return of([
            {
                type: 'Opel',
                model: 'Corsa',
                year: 2020,
            },
            {
                type: 'Audi',
                model: 'A4',
                year: 2019,
            },
            {
                type: 'BMW',
                model: 'X6',
                year: 2021,
            },
        ]);
    }
}
