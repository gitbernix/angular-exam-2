import { Injectable } from '@angular/core';

import { data } from '../models/cars';
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    Firestore,
    getDocs,
    writeBatch,
} from '@angular/fire/firestore';
import { CarModel} from '../models/car.model';
import { from, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CarService {
    private readonly carCollectionRef = collection(this.firestore, 'cars');

    constructor(private firestore: Firestore) {}

    // //*Drop, intitialize, and upload firebase db
    public async initializeDb(): Promise<void> {
        await this.dropCollection('cars');
        await this.uploadCollection('cars', data);
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

    private async uploadCollection(collectionName: string, data: CarModel[]) {
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
    addCar(car: CarModel): Observable<DocumentData> {
        return from(addDoc(this.carCollectionRef, car));
    }

    // GETCARS
    getCars(): Observable<CarModel[]> {
        return from(getDocs(this.carCollectionRef)).pipe(
            map((snapshot) => {
                const resultList = snapshot.docs.map((doc) => {
                    const carData: CarModel = doc.data() as CarModel;
                    carData.id = doc.id;
                    return carData;
                });
                return resultList;
            })
        );
    }
}
