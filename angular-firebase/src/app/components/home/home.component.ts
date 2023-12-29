import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public resetInProgress: boolean = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {}

  public async resetDatabase(): Promise<void> {
    this.resetInProgress = true;
    await this.carService.initializeDb();
    this.resetInProgress = false;
  }
}
