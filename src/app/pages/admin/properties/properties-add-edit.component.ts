import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PropertyService, AlertService } from '../../../_services';

@Component({ templateUrl: 'properties-add-edit.component.html' })
export class PropertiesAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private propertyService: PropertyService,
        private alertService: AlertService
    ) {}

    async ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            propertyManagerId: ['', Validators.required],
            petOwnerId: ['', Validators.required],
            propertyName: ['', Validators.required],
            houseUnitNumber: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            petCount: ['', Validators.required]
        });

        if (!this.isAddMode) {
            (await this.propertyService.getById(this.id))
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
            this.createProperty();
        } else {
            this.updateProperty();
        }
    }

    private createProperty() {
        this.propertyService.create(this.form.value)
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

    private async updateProperty() {
        (await this.propertyService.update(this.id, this.form.value))
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
