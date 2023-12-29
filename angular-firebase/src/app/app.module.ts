import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
        CarListComponent,
        CarFormComponent,
        MovieListComponent,
        MovieFormComponent,
        ListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
