/********************************************************************************************************
 * Attempting to make a Dynamic & General [CR]eate[U]pdate[D]elete Service
 * takes
 *
 ********************************************************************************************************/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {} from '../_models';

@Injectable({ providedIn: 'root' })
export class CrudAllService {
    objectCtx: string;
    objectSubject:any;
    object: any;
    baseUrl: string;


    constructor(
        objectCtxPassedIn: string,
        private router: Router,
        private http: HttpClient
    ) {
        this.objectCtx = objectCtxPassedIn;
        this.baseUrl = `${environment.apiUrl}/${this.objectCtx}`;
        this.objectSubject = new BehaviorSubject(null);
        this.object = this.objectSubject.asObservable();
    }

    public get objectValue(){
        return this.objectSubject.value;
    }


    getAll() {
        return this.http.get<[]>(this.baseUrl);
    }

    getById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(this.baseUrl, params);
    }

    update(id, params) {
        return this.http.put(`${this.baseUrl}/${id}`, params)
            .pipe(map((object: any) => {
                // update the current account if it was updated
                if (object.id === this.objectValue.id) {
                    // publish updated account to subscribers
                    object = { ...this.objectValue, ...object };
                    this.objectSubject.next(object);
                }
                return object;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in account was deleted
               // if (id === this.accountValue.id)
                   // this.logout();
            }));
    }

}
