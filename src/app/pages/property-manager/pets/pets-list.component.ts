import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PetService } from '../../../_services';

@Component({ templateUrl: 'pets-list.component.html' })
export class PetsListComponent implements OnInit {
    pets: any[];

    constructor(private petService: PetService) {}

    ngOnInit() {
        this.petService.getAll()
            .pipe(first())
            .subscribe(pets => this.pets = pets);
    }

    deletePet(id: string) {
        const petTest = this.pets.find(x => x.id === id);
        petTest.isDeleting = true;
        this.petService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.pets = this.pets.filter(x => x.id !== id)
            });
    }
}
