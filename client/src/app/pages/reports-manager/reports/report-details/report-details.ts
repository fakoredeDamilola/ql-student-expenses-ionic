import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
  AccountService,
  AlertService,
  ExpenseService,
  ReportService,
} from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Location } from "@angular/common";
import { MinusPipe } from '@app/minus.pipe';


@Component({
  selector: "page-report-details",
  templateUrl: "report-details.html",
  styleUrls: ["./report-details.scss"],
})
export class ReportDetailsPage {
  accountId: string;
  reportId: string;
  report = { reportName: "" };
  petOwner = {
    title: "",
    firstName: "",
    lastName: "",
    isVerified: true,
    email: "",
  };
  reportExpenses = [];
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: any;
  savingReport: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  deleting: Promise<HTMLIonLoadingElement>;
  reportName: string;
  reportExpensesCount: number = 0;
  reportStudentsCount: number;
  reportStudents: any;
  userExpenses: any;
  totalOfReportExpenses: number = 0;
  calculatingDisbursementsLoader: Promise<HTMLIonLoadingElement>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public reportService: ReportService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService,
    public expenseService: ExpenseService,
    private _location: Location
  ) {
    this.deleting = this.alertService.presentLoading("Deleting Account...");
    this.savingReport = this.alertService.presentLoading("Saving Report...");
    this.calculatingDisbursementsLoader = this.alertService.presentLoading(
      "Calculating Disbursements..."
    );
  }

  async ionViewDidEnter() {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.reportId = this.route.snapshot.paramMap.get("reportId");
    // get id out of url
    if (this.accountService.accountValue.role != "Admin") {
      window.history.replaceState(
        {},
        document.title,
        "/" + "report-manager/reports/report-details"
      );
    }
    // This Chain can be split up later for lazy loading each section
    // Get Report Info
    (await this.reportService.getById(this.reportId))
      .forEach(async (Element) => {
        this.reportName = Element.reportName;
      })
      .then(async () => {
        // Get Report Students
        (await this.accountService.getAllStudentsByReportId(this.reportId))
          .forEach(async (Elem) => {
            console.log("All Report Students", Elem);
            this.reportStudents = Elem;
          })
          .then(async () => {
            // Get Report Expenses
            (
              await this.expenseService.getAllExpensesByReportId(this.reportId)
            ).forEach(async (El) => {
              //console.log("All Report Expenses", El);
              this.reportExpenses = El;
              this.reportExpensesCount = this.reportExpenses.length;
              for (let i = 0; i < this.reportExpensesCount; i++) {
                this.totalOfReportExpenses += Number(
                  this.reportExpenses[i].expenseCost
                );
              }
              this.totalOfReportExpenses = Number(
                this.totalOfReportExpenses.toFixed(2)
              );
            });
          })
          .finally(async () => {
            setTimeout(async () => {
              (await this.loading).dismiss();
            }, 400);
          });
      });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }
  async editReportAttribute(contextParameter: string) {
    // switch case so this is dynamic, pretty cool
    let popUpText: string;
    let currentValue: string;
    switch (contextParameter) {
      case "reportName": {
        popUpText = "Name (Optional)";
        currentValue = this.reportName;
        break;
      }
    }
    // then that value from the switch being fed here
    const alert = await this.alertCtrl.create({
      header: `Change Report ${popUpText}?`,
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            (await this.savingReport).present();
            this.updateReportMasterList(data, popUpText);
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: `${contextParameter}`,
          value: `${currentValue}`,
          placeholder: `Report ${popUpText}`,
        },
      ],
    });
    alert.present();
  }

  private async updateReportMasterList(contextParamValue, popUpText) {
    console.log(contextParamValue, "what is this??");
    console.log(this.reportId);
    (await this.reportService.update(this.reportId, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          (await this.savingReport).dismiss();
          this.alertService.createToastAlert(
            `Update To Report ${popUpText} Successful`,
            "success",
            8000
          );
          this.saving = false;
          this.ionViewWillEnter();
        },
        error: async (error) => {
          (await this.savingReport).dismiss();
          this.alertService.createToastAlert(
            `Update to Report ${popUpText} Failed...`,
            "warning",
            8000
          );
        },
      });
  }

  async deleteAreYouSure() {
    const alert = await this.alertCtrl.create({
      header: "Delete Report",
      message:
        "Are You Sure you want to DELETE this Report??  This Action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {},
        },
        {
          text: "DELETE",
          handler: async () => {
            await this.deleteReport();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async deleteReport() {
    (await this.deleting).present();
    this.reportService
      .delete(this.reportId)
      .pipe(first())
      .subscribe({
        next: async () => {
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Report Deleted Successfully!",
            "success",
            8000
          );
          this._location.back();
        },
        error: async (error) => {
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Report Delete failed.....!",
            "danger",
            8000
          );
        },
      });
  }

  /*private async getAllReportExpenses() {
    //for each student get expenses
    for (let i = 0; i < this.reportStudentsCount; i++) {
      (
        await this.accountService.getAllExpensesOnAccount(
          this.reportStudents[i].id
        )
      )
        .forEach(async (Element) => {
          this.userExpenses = Element;
        })
        .then(async () => {
          if (this.userExpenses.length > 0) {
            for (let i = 0; i < this.userExpenses.length; i++) {
              this.reportExpenses[this.reportExpensesCount] = this.userExpenses[
                i
              ];
              this.reportExpensesCount += 1;
              console.log(this.reportExpensesCount,'WHAT IS THIS')
            }
          }
        })
    }
  }*/

  // calculate pot disbursement

  public async calculateDisbursements() {
    (await this.calculatingDisbursementsLoader).present();
    // take total devide by number of students to get average
    console.log(this.totalOfReportExpenses);
    console.log(this.reportStudents.length);

    const studentCount = this.reportStudents.length;

    let averageOfExpenses =
      this.totalOfReportExpenses / studentCount;

    averageOfExpenses = Number(averageOfExpenses.toFixed(2));

    console.log(averageOfExpenses, "average");

    // calculate how much each student spent

    for(let i=0; i< studentCount;i++){
      let studentExpensesTotal = Number(this.reportStudents[i].expensesTotal)
      this.reportStudents[i].disbursementAmmount = (averageOfExpenses-studentExpensesTotal).toFixed(2);
      console.log(this.reportStudents[i])
    }

    (await this.calculatingDisbursementsLoader).dismiss();

    // calculate how much each student owes or is owed to/from disbursements
  }

  async makePositive(){

  }
}
