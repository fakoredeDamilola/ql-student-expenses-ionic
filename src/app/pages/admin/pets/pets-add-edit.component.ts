import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, PetService } from '@app/_services';

@Component({ templateUrl: 'pets-add-edit.component.html' })
export class PetsAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private petService: PetService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            petOwnerId:  ['', Validators.required],
            propertyId: ['', Validators.required],
            propertyManagerId: ['', Validators.required],
            petName: ['', Validators.required],
            species: ['', Validators.required],
            breed:  ['', Validators.required],
            rating:  ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.petService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get objectId() { return this.id; }
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createPet();
        } else {
            this.updatePet();
        }
    }

    private createPet() {
        this.petService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    //this.alertService.success('Property created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                  //  this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updatePet() {
        this.petService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                 //   this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    //this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
