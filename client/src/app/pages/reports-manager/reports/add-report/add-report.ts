import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController, LoadingController } from "@ionic/angular";
import { AccountService, AlertService, ReportService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { ReportOptions } from "@app/interfaces/report-options";

@Component({
  selector: "page-report-add",
  templateUrl: "add-report.html",
  styleUrls: ["./add-report.scss"],
})
export class AddReportPage {
  account = this.accountService.accountValue;
  submitted: boolean = false;
  loading: any;
  currentRoute: string = this.router.url;

  addReport: ReportOptions = {
    reportName: "",

  };

  constructor(
    private accountService: AccountService,
    private reportService: ReportService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    (await this.loading).dismiss();
  }

  async ionViewWillEnter() {
    (await this.loading).present();
  }

  async onAddReport(form?: NgForm) {
    (await this.loading).present();
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.createToastAlert(
        "Add to properties failed, fields are invalid.....!",
        "danger",
        8000
      );
      return;
    }
    form.value.reportsManagerId = this.account.id;

    if (this.accountService.accountValue.role == "Admin") {
      console.log(this.route.snapshot.paramMap.get("accountId"));
      form.value.ReportManagerId = this.route.snapshot.paramMap.get(
        "accountId"
      );

      if (this.route.snapshot.paramMap.get("accountId") == null) {
        form.value.ReportManagerId = this.account.id;
      }
    }

    this.reportService
      .create(form.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          (await this.loading).dismiss();
          this.alertService.createToastAlert(
            "Report Added Successfully!",
            "success",
            8000
          );
          //await this.userData.signup(this.signup.email);
          const backUrl = this.currentRoute.replace("/add", "");
          this.router.navigateByUrl(backUrl);
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Add to properties failed.....!",
            "danger",
            8000
          );
          this.loading = false;
        },
      });
  }
}
