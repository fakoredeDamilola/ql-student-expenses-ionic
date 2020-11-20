import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { UserData } from "@app/providers/user-data";
import { AlertService, PropertyService } from "@app/_services";
import { first, mapTo } from "rxjs/operators";
import { Property } from "@app/_models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "page-property-detail",
  styleUrls: ["./property-detail.scss"],
  templateUrl: "property-detail.html",
})
export class PropertyDetailPage implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  defaultHref = '';

  property : Property;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

   (await this.propertyService.getById(this.id)).forEach((prop)=>{

   })

  }



  // convenience getter for easy access to form fields
  get objectId() {
    return this.id;
  }
  get f() {
    return this.form.controls;
  }
  ionViewDidEnter() {
    this.defaultHref = `/admin/properties/property-test`;
  }
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
    this.propertyService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          //this.alertService.success('Property created successfully', { keepAfterRouteChange: true });
          this.router.navigate(["../"], { relativeTo: this.route });
        },
        error: (error) => {
          //  this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  private async updateProperty() {
    (await this.propertyService
      .update(this.id, this.form.value))
      .pipe(first())
      .subscribe({
        next: () => {
          //   this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(["../../"], { relativeTo: this.route });
        },
        error: (error) => {
          //this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
