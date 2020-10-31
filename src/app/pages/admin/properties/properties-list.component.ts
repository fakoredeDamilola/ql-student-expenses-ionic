import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PropertyService } from '../../../_services/';

@Component({ templateUrl: 'properties-list.component.html' })
export class PropertiesListComponent implements OnInit {
    properties: any[];

    constructor(private propertyService: PropertyService) {}

    ngOnInit() {
        this.propertyService.getAll()
            .pipe(first())
            .subscribe(properties => this.properties = properties);
    }

    deleteProperty(id: string) {
        const property = this.properties.find(x => x.id === id);
        property.isDeleting = true;
        this.propertyService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.properties = this.properties.filter(x => x.id !== id)
            });
    }
}
