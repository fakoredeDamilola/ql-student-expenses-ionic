import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, ExpenseService } from "@app/_services";
import {
  AlertController,
  IonRouterOutlet,
  ModalController,
} from "@ionic/angular";
import { first } from "rxjs/operators";
import { Location } from "@angular/common";

import { ToastController } from "@ionic/angular";

import { WebView } from "@ionic-native/ionic-webview/ngx";

const STORAGE_KEY = "my_images";
@Component({
  selector: "page-expense-details",
  templateUrl: "expense-details.html",
  styleUrls: ["./expense-details.scss"],
})
export class ExpenseDetailsPage {
  accountId: any;
  expenseId: any;
  expenseName: any;
  savingExpense: Promise<HTMLIonLoadingElement>;
  loading: Promise<HTMLIonLoadingElement>;
  deleting: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  expenseCost: string;
  expenseCreated: string;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public expenseService: ExpenseService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService,
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController,
    private _location: Location,
    private webview: WebView,
    private toastController: ToastController
  ) {
    this.savingExpense = this.alertService.presentLoading("Saving Expense...");
    this.deleting = this.alertService.presentLoading("Deleting Expense...");
  }

  pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.expenseId = this.route.snapshot.paramMap.get("expenseId");

    // get id out of the url
    if (this.accountService.accountValue.role != "Admin") {
      window.history.replaceState(
        {},
        document.title,
        "/" + "account/expenses/expense-details"
      );
    }

    (await this.expenseService.getById(this.expenseId))
      .forEach(async (Element) => {
        console.log(Element);
        this.expenseName = Element.expenseName;
        this.expenseCost = Element.expenseCost;
        this.expenseCreated = Element.created;
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });
  }
  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }
  async editExpenseName() {
    let alert = await this.alertCtrl.create({
      header: "Change expense Name",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            (await this.savingExpense).present();
            this.updateExpenseMasterList(data);
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "expenseName",
          value: this.expenseName,
          placeholder: "us",
        },
      ],
    });
    await alert.present();
  }

  private async updateExpenseMasterList(contextParamValue) {
    (await this.expenseService.update(this.expenseId, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          (await this.savingExpense).dismiss();
          this.alertService.createToastAlert(
            "Update To Expense Successful!",
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
          (await this.savingExpense).dismiss();
          this.alertService.createToastAlert(
            "Update To Expense Failed...",
            "warning",
            8000
          );
        },
      });
  }

  async deleteAreYouSure() {
    const alert = await this.alertCtrl.create({
      header: "Delete expense",
      message:
        "Are you sure you want to DELETE this expense??  This action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {},
        },
        {
          text: "DELETE",
          handler: async () => {
            await this.deleteExpense();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteExpense() {
    (await this.deleting).present();
    (await this.expenseService.delete(this.expenseId)).pipe(first()).subscribe({
      next: async () => {
        (await this.deleting).dismiss();
        this.alertService.createToastAlert(
          "Expense Deleted Successfully!",
          "success",
          8000
        );
        this._location.back();
      },
      error: async (error) => {
        (await this.deleting).dismiss();
        this.alertService.createToastAlert(
          "Expense Delete failed.....!",
          "danger",
          8000
        );
      },
    });
  }
}
