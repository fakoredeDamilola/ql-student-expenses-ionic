import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, ReportService } from "@app/_services";
import { AlertController, LoadingController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Account } from "@app/_models/account";
import {Location} from '@angular/common';
import { Expense} from '@app/_models';

@Component({
  selector: "page-report-details",
  templateUrl: "report-details.html",
  styleUrls: ["./report-details.scss"],
})
export class ReportDetailsPage {
  accountId: string;
  reportId: string;
  report = { reportName: "" };
  petOwner ={title:'', firstName:'', lastName:'', isVerified:true, email:''};
  reportExpenses:[Expense];
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: any;
  savingReport: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  deleting: Promise<HTMLIonLoadingElement>;
  reportName: string;
  reportExpensesCount: number;
  reportStudentsCount: number;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public reportService: ReportService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService,
    private _location: Location
  ) {
    this.loading = this.alertService.presentLoading("Student Expenses App");
    this.deleting = this.alertService.presentLoading("Deleting Account...");
    this.savingReport = this.alertService.presentLoading("Saving Report...")
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.reportId = this.route.snapshot.paramMap.get("reportId");
    // get id out of url
    if(this.accountService.accountValue.role!='Admin'){
      window.history.replaceState(
        {},
        document.title,
        "/" + "report-manager/reports/report-details"
      );
    }

    (await this.reportService
      .getById(this.reportId))
      .forEach(async (Element) => {
        //console.log(Element,"here")
        this.reportName =Element.reportName;

        console.log(Element)
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }


  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }
  async editReportAttribute(contextParameter:string) {
    // switch case so this is dynamic, pretty cool
    let popUpText:string;
    let currentValue:string;
    switch (contextParameter) {
      case "reportName": {
        popUpText = "Name (Optional)";
        currentValue = this.reportName;
        break;
      }
     /* case "houseUnitNumber": {
        popUpText = "House / Unit #";
        currentValue = this.Report.houseUnitNumber;
        break;
      }
      case "street": {
        popUpText = "Street";
        currentValue = this.Report.street;
        break;
      }
      case "city": {
        popUpText = "City";
        currentValue = this.Report.city;
        break;
      }
      case "state": {
        popUpText = "State";
        currentValue = this.Report.state;
        break;
      }
      case "zip": {
        popUpText = "Zip Code";
        currentValue = this.Report.zip;
        break;
      }*/
    }
    // then that value from the switch being fed here
    const alert = await this.alertCtrl.create({
      header: `Change Report ${popUpText}?`,
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            ( await (this.savingReport)).present();
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
    //console.log(contextParamValue,"what is this??");
    (await this.reportService
      .update(this.reportId, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          ( await (this.savingReport)).dismiss();
          this.alertService.createToastAlert(
            `Update To Report ${popUpText} Successful`,
            "success",
            8000
          );
          this.saving = false;
          this.ionViewWillEnter();
        },
        error: async (error) => {
          ( await (this.savingReport)).dismiss();
          this.alertService.createToastAlert(
            `Update to Report ${popUpText} Failed...`,
            "warning",
            8000
          );
        },
      });
  }



  async deleteAreYouSure(){
    const alert = await this.alertCtrl.create({
      header: "Delete Report",
      message: "Are You Sure you want to DELETE this Report??  This Action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
          },
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
}
