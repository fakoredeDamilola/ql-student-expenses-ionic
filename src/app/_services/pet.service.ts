import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Pet } from '../_models';

const baseUrl = `${environment.apiUrl}/pets`;

@Injectable({ providedIn: 'root' })
export class PetService {
    private petSubject: BehaviorSubject<Pet>;
    public pet: Observable<Pet>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.petSubject = new BehaviorSubject<Pet>(null);
        this.pet = this.petSubject.asObservable();
    }

    public get petTestValue(): Pet {
        return this.petSubject.value;
    }

    getAll() {
        return this.http.get<Pet[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Pet>(`${baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id:string, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((pet: any) => {
                // update the current pet if it was updated
               // if (pet.id === this.petTestValue.id) {
                    // publish updated pet to subscribers
                //    pet = { ...this.petTestValue, ...pet };
                //    this.petSubject.next(pet);
               // }
                return pet;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in pet was deleted
            }));
    }


}
