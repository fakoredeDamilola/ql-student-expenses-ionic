import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, ExpenseService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

@Component({
  selector: "page-expense-details",
  templateUrl: "expense-details.html",
  styleUrls: ["./expense-details.scss"],
})
export class ExpenseDetailsPage {
  accountId: any;
  expenseId: any;
  expenseName: any;
  loading: any;
  expense={expenseName:'', expenseCost:''}

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public ExpenseService: ExpenseService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService
  ) {
    this.loading = this.alertService.presentLoading("Expense Check &#10003;");
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.expenseId = this.route.snapshot.paramMap.get("expenseId");
    // get id out of the url
    if(this.accountService.accountValue.role!='Admin')
    window.history.replaceState(
      {},
      document.title,
      "/" + "property-manager/properties-Expenses/Expense-details"
    );

    (await this.ExpenseService.getById(this.expenseId)).forEach(async (Element) => {
      this.expense= Element;
    })
    .then(async () => {
      (await this.loading).dismiss();
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }


  private async updateExpenseMasterList(contextParamValue) {
    (await this.ExpenseService
      .update(this.expenseId, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          this.alertService.createToastAlert(
            "Update To Expense Successful!",
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Update To Expense Failed...",
            "warning",
            8000
          );
        },
      });
  }
}
