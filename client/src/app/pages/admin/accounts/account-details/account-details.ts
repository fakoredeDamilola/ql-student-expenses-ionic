import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Expense, Report, Account } from "@app/_models";
import { Location } from "@angular/common";
import * as moment from "moment";

@Component({
  selector: "page-account-details",
  templateUrl: "account-details.html",
  styleUrls: ["./account-details.scss"],
})
export class AccountDetailsPage {
  accountId: string;
  account = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    updated: "",
    isVerified: true,
    created: "",
    title: "",
    lastLogin: "",
    isOnline: false,
  };
  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  hasReport: boolean = false;
  hasExpenses: boolean = false;
  studentExpenses: [Expense] | Expense | undefined;
  studentExpensesCount: number;
  hasReports: boolean = false;
  // If they are a R.M
  reportsManagerReports: [Report] | Report | undefined;
  reportsManagerCount: number;
  reportsManagerStudentsCount: number;
  reportsManagerExpensesCount: number;
  deleting: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  savingAccount: Promise<HTMLIonLoadingElement>;
  totalOfExpenses: number = 0;
  reportsManagerReportsCount: number;
  reportsManager: Account | undefined;
  studentReport: Report;
  deadData = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //skeleton
  data: boolean;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    private router: Router,
    private _location: Location
  ) {}
  async ionViewWillEnter() {
    this.account = null;
    this.data = false;
    this.loading = this.alertService.presentLoading("Admin Student Expenses");
    //reseting expense total
    this.totalOfExpenses = 0;
    (await this.loading).present();
    // The account your viewing....
    this.accountId = this.route.snapshot.paramMap.get("accountId");
    (await this.accountService.getById(this.accountId))
      .forEach(async (Element) => {
        //console.log(Element)
        this.account = Element;
        this.reportsManager = Element.reportsManager;
        this.studentReport = Element.studentReport;
        this.studentExpenses = Element.studentExpenses;
        this.studentExpensesCount = Element.studentExpensesCount;
        this.reportsManagerStudentsCount = Element.reportsManagerStudentsCount;
        this.reportsManagerReportsCount = Element.reportsManagerReports.length;
        this.reportsManagerExpensesCount = Element.reportsManagerExpensesCount;
        if (this.studentExpenses.length > 0) {
          this.hasExpenses = true;
        }
        // Last login format
        if (this.account.lastLogin != undefined) {
          this.account.lastLogin = moment(this.account.lastLogin).format(
            "MMM-DD-YYYY @HH:mm"
          );
        }
        //calculate expenses total and format each date
        for (let i = 0; i < this.studentExpensesCount; i++) {
          this.totalOfExpenses += Number(this.studentExpenses[i].expenseCost);
          this.studentExpenses[i].created = moment(
            this.studentExpenses[i].created
          ).format("MMM-DD-YYYY @HH:mm");
        }
        this.totalOfExpenses = Number(this.totalOfExpenses.toFixed(2));
      })
      .then(async () => {
        this.account.created = moment(this.account.created).format(
          "MMM-DD-YYYY @HH:mm"
        );
        this.account.updated = moment(this.account.updated).format(
          "MMM-DD-YYYY @HH:mm"
        );
      })
      .finally(async () => {
        this.data = true;
        (await this.loading).dismiss();
      });
  }

  async deleteAreYouSure() {
    const alert = await this.alertCtrl.create({
      header: "Admin Delete Account",
      message:
        "Are You Sure you want to DELETE this account??  This Action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {},
        },
        {
          text: "DELETE",
          handler: async () => {
            await this.deleteAccount();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async deleteAccount() {
    this.deleting = this.alertService.presentLoading("Deleting Account...");
    (await this.deleting).present();
    (await this.accountService.delete(this.accountId)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        (await this.deleting).dismiss();
        this.alertService.createToastAlert(
          "Account Deleted Successfully!",
          "success",
          8000
        );
        this._location.back();
      },
      error: async (error) => {
        (await this.deleting).dismiss();
        this.alertService.createToastAlert(
          "Account Delete failed.....!",
          "danger",
          8000
        );
      },
    });
  }

  async changeAccount(contextParamValue: string) {
    let popUpText: string;
    // getting and setting current values
    let currentValue: string | boolean;
    let adminChecked: boolean = false;
    let reportsManagerChecked: boolean = false;
    let studentChecked: boolean = false;

    switch (contextParamValue) {
      case "role": {
        popUpText = "Role";
        switch (this.account.role) {
          case "Admin": {
            adminChecked = true;
            break;
          }
          case "ReportsManager": {
            reportsManagerChecked = true;
            break;
          }
          case "Student": {
            studentChecked = true;
            break;
          }
        }
        break;
      }
      case "title": {
        popUpText = "Title";
        break;
      }
      case "firstName": {
        popUpText = "First Name";
        currentValue = this.account.firstName;
        break;
      }
      case "lastName": {
        popUpText = "Last Name";
        currentValue = this.account.lastName;
        break;
      }
      case "email": {
        currentValue = this.account.email;
        popUpText = "Email";
        break;
      }
    }

    if (contextParamValue == "role") {
      const alert = await this.alertCtrl.create({
        header: `Change Account Role?`,
        buttons: [
          "Cancel",
          {
            text: "Ok",
            handler: async (data: any) => {
              //console.log(data);
              const roleJsonObj = JSON.parse(`{"role":"${data}"}`);
              this.savingAccount = this.alertService.presentLoading(
                "Saving..."
              );
              (await this.savingAccount).present();
              await this.updateAccount(roleJsonObj, popUpText);
            },
          },
        ],
        inputs: [
          {
            type: "radio",
            label: `Admin`,
            name: "role",
            value: "Admin",
            checked: adminChecked,
          },
          {
            type: "radio",
            label: `Reports Manager`,
            name: "role",
            value: "ReportsManager",
            checked: reportsManagerChecked,
          },
          {
            type: "radio",
            label: `Student`,
            name: "role",
            value: "Student",
            checked: studentChecked,
          },
        ],
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: `Change ${popUpText}?`,
        buttons: [
          "Cancel",
          {
            text: "Ok",
            handler: async (data: any) => {
              //console.log(data);
              this.savingAccount = this.alertService.presentLoading(
                "Saving..."
              );
              (await this.savingAccount).present();
              await this.updateAccount(data, popUpText);
            },
          },
        ],
        inputs: [
          {
            type: "text",
            name: `${contextParamValue}`,
            placeholder: `${popUpText}`,
            value: `${currentValue}`,
          },
        ],
      });
      await alert.present();
    }
  }

  private async updateAccount(contextParamValue: any, popUpText: string) {
    //console.log(contextParamValue,"what is this??")
    (await this.accountService.update(this.accountId, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          (await this.savingAccount).dismiss();
          this.alertService.createToastAlert(
            `Update to ${popUpText} Successful`,
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
          (await this.savingAccount).dismiss();
          this.alertService.createToastAlert(
            `Update to ${popUpText} Failed...`,
            "warning",
            8000
          );
        },
      });
  }
}
