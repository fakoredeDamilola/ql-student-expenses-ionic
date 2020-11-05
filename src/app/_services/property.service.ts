import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Property } from "../_models";
import { stringify } from '@angular/compiler/src/util';

const baseUrl = `${environment.apiUrl}/properties`;

@Injectable({ providedIn: "root" })
export class PropertyService {
  private propertySubject: BehaviorSubject<Property>;
  public property: Observable<Property>;

  constructor(private router: Router, private http: HttpClient) {
    this.propertySubject = new BehaviorSubject<Property>(null);
    this.property = this.propertySubject.asObservable();
  }

  public get propertyValue(): Property {
    return this.propertySubject.value;
  }

  async getAll() {
    return this.http.get<Property[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Property>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params).pipe(
      map((property: any) => {
        // update the current property if it was updated
        // if (property.id === this.propertyValue.id) {
        // publish updated property to subscribers
        //    property = { ...this.propertyValue, ...property };
        //    this.propertySubject.next(property);
        // }
        return property;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`).pipe(
      finalize(() => {
        // auto logout if the logged in property was deleted
      })
    );
  }
}
