import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

    ngOnInit(): void {
        this.cars$ = this.carService.getCars();
    }
}
