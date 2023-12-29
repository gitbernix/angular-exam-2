import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
    cars$: Observable<CarModel[]> = new Observable();

    constructor(private carService: CarService) {}

    //Lista rendezése év szerint, növekvő sorrendben
    // ngOnInit(): void {
    //     this.cars$ = this.carService
    //         .getCars()
    //         .pipe(map((cars) => cars.sort((a, b) => a.year - b.year)));
    // }

    //Lista rendezése márka szerint, ABC sorrendben
    ngOnInit(): void {
        this.cars$ = this.carService
            .getCars()
            .pipe(
                map((cars) =>
                    cars.sort((a, b) => a.brand.localeCompare(b.brand))
                )
            );
    }
}
