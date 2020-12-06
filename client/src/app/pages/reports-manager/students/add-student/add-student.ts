import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UserOptions } from "@app/interfaces/student-options";
import { AccountService, AlertService, ReportService } from "@app/_services";
import { first } from "rxjs/operators";
import { UserData } from "@app/providers/user-data";
import { Location } from "@angular/common";

@Component({
  selector: "page-add-student",
  templateUrl: "add-student.html",
  styleUrls: ["./add-student.scss"],
})
export class AddStudentPage {
  signup: UserOptions = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    acceptTerms: false,
    reportId: "",
    reportsManagerId: "",
    password: "",
    confirmPassword: "",
  };
  submitted = false;

  accountId: string;
  reportId: any;
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  addingStudent: Promise<HTMLIonLoadingElement>;
  reportsManagerId: string;
  reportsManager: any;

  constructor(
    public route: ActivatedRoute,
    public alertService: AlertService,
    public accountService: AccountService,
    private userData: UserData,
    private reportService: ReportService,
    private _location: Location
  ) {
    this.addingStudent = this.alertService.presentLoading(
      "Adding Student;"
    );
  }

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses App");
    (await this.loading).present();
    this.reportId = this.route.snapshot.paramMap.get("reportId");
    // get report, then the reportManagerId
    (await this.reportService.getById(this.reportId))
      .forEach(async (Element) => {
        console.log(Element)
        this.reportsManagerId = Element.reportsManagerId;
      })
      .then(async () => {
        (await this.loading).dismiss();
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });

    if (this.accountService.accountValue.role != "Admin") {
      window.history.replaceState(
        {},
        document.title,
        "/" + "report-manager/reports/report-details/student/add"
      );
    }
  }

  async ionViewDidEnter() {
    (await this.loading).dismiss();
  }

  async onAddStudent(form?: NgForm) {
    (await this.addingStudent).present();
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      (await this.addingStudent).dismiss();
      return;
    }
    // creating variables for default account
    form.value.reportsManagerId = this.reportsManagerId;
    form.value.reportId = this.reportId;
    form.value.password = "StudentExpenses123";
    form.value.confirmPassword = "StudentExpenses123";

    // TODO add the newly created accounts ID to this reports Owner ID

    if (!form.value.title) {
      form.value.title = "N/A";
    }

    //console.log("the form for add pet owner...", form.value)

    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        await this.alertService.createToastAlert(
          "Invite Email To Student Sent Successfully",
          "success",
          5000
        );
        await this.userData.signup(this.signup.email);
        (await this.addingStudent).dismiss();
        this._location.back();
      },
      error: async (error) => {
        await this.alertService.createToastAlert(
          "Invite Email Sent Failed!",
          "danger",
          5000
        );
        (await this.addingStudent).dismiss();
      },
    });
  }
}
