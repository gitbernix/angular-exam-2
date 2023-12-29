import { Component, OnInit } from '@angular/core';
import { combineLatest, map, of, tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    mergedCars$ = combineLatest([
        this.dataService.getNewCars$(),
        this.dataService.getUsedCars$(),
    ]).pipe(
        tap(([newCars, usedCars]) => console.log(newCars, usedCars)),
        map(([newCars, usedCars]) => {
            const newCarsUsed = newCars.map((car: any) => ({
                ...car,
                isUsed: false,
            }));
            const usedCarsUsed = usedCars.map((car: any) => ({
                ...car,
                isUsed: true,
            }));
            return [newCarsUsed, usedCarsUsed];
        }),
        map(([newCars, usedCars]) => [...newCars, ...usedCars]),
        map((cars) => cars.sort((a, b) => a.year - b.year))
    );

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.dataService.test();
    }
}
