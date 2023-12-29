import { MovieModel } from './../models/movie.model';
import { Injectable } from '@angular/core';

import { data } from '../models/movies';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    Firestore,
    getDocs,
    updateDoc,
    writeBatch,
} from '@angular/fire/firestore';

import { from, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private readonly movieCollectionRef = collection(this.firestore, 'movies');

    constructor(private firestore: Firestore) {}

    // //*Drop, intitialize, and upload firebase db
    public async initializeDb(): Promise<void> {
        await this.dropCollection('movies');
        await this.uploadCollection('movies', data);
    }

    private async dropCollection(collectionName: string): Promise<void> {
        console.log(`Dropping collection ${collectionName}`);

        const c = collection(this.firestore, collectionName);
        const snapshot = await getDocs(c);

        const batch = writeBatch(this.firestore);
        for (let doc of snapshot.docs) {
            batch.delete(doc.ref);
        }
        await batch.commit();

        console.log(`Done!`);
    }

    private async uploadCollection(collectionName: string, data: MovieModel[]) {
        console.log(`Uploading collection ${collectionName}`);

        const collectionRef = collection(this.firestore, collectionName);
        const batch = writeBatch(this.firestore);
        data.forEach((data) => {
            const ref = doc(collectionRef);
            batch.set(ref, data);
        });
        await batch.commit();

        console.log(`Done!`);
    }

    // SAVE
    saveMovie(movie: MovieModel): Observable<DocumentData> {
        return from(addDoc(this.movieCollectionRef, movie));
    }

    //DELETE
    deleteMovie(movieId: string): Observable<void> {
        const movieDoc = doc(this.firestore, `movies/${movieId}`);
        return from(deleteDoc(movieDoc));
    }

    // UPDATE
    updateMovie(movieId: string, movie: Partial<MovieModel>): Observable<void> {
        const movieDoc = doc(this.firestore, `movies/${movieId}`);
        return from(updateDoc(movieDoc, movie));
    }

    // GETMovies
    getMovies(): Observable<MovieModel[]> {
        return from(getDocs(this.movieCollectionRef)).pipe(
            map((snapshot) => {
                const resultList = snapshot.docs.map((doc) => {
                    const movieData: MovieModel = doc.data() as MovieModel;
                    movieData.id = doc.id;
                    return movieData;
                });
                return resultList;
            })
        );
    }
}
