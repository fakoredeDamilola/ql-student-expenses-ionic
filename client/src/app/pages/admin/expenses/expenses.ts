import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config,
} from "@ionic/angular";

import { ExpensesFilterPage } from "./expenses-filter/expenses-filter";
import { UserData } from "@app/providers/user-data";
import { AlertService, ExpenseService } from "@app/_services";
import { Account, Expense } from "@app/_models";
import * as moment from "moment";

@Component({
  selector: "page-expenses",
  templateUrl: "expenses.html",
  styleUrls: ["./expenses.scss"],
})
export class ExpensesPage {
  ios: boolean;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  loading: any;
  allAccounts: any | [Account];
  allExpenses: any | [Expense];
  // Filters list items
  foodIsChecked: boolean;
  hotelIsChecked: boolean;
  entertainmentIsChecked: boolean;
  otherIsChecked: boolean;
  filtersList: any;
  currentRoute: string = this.router.url;
  // Filters list items for hidden in view
  foodCondition: string = "";
  hotelCondition: string = "";
  entertainmentCondition: string = "";
  otherCondition: string = "";

  constructor(
    public alertCtrl: AlertController,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private expenseService: ExpenseService
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Admin Student Expenses");
    (await this.loading).present();
    this.foodIsChecked = true;
    this.hotelIsChecked = true;
    this.entertainmentIsChecked = true;
    this.otherIsChecked = true;
    this.ios = (await this.config.get("mode")) === "ios";
    (await this.expenseService.getAll())
      .forEach(async (Element) => {
        this.allExpenses = Element;
        //console.log(this.allExpenses, "right here");
      })
      .then(async () => {
        const expensesCount = this.allExpenses.length;
        for (let i = 0; i < expensesCount; i++) {
          this.allExpenses[i].created = moment(
            this.allExpenses[i].created
          ).format("MM-DD-YYYY @HH:mm:ss");
        }
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 100);
      });
  }

  // Updates main view from filter...very cool
  async updateView() {
    this.foodIsChecked
      ? (this.foodCondition = "")
      : (this.foodCondition = "Food");

    this.hotelIsChecked
      ? (this.hotelCondition = "")
      : (this.hotelCondition = "Hotel");

    this.entertainmentIsChecked
      ? (this.entertainmentCondition = "")
      : (this.entertainmentCondition = "Entertainment");

    this.otherIsChecked
      ? (this.otherCondition = "")
      : (this.otherCondition = "Other");
  }

  async presentFilter() {
    this.filtersList = {
      foodIsChecked: this.foodIsChecked,
      hotelIsChecked: this.hotelIsChecked,
      entertainmentIsChecked: this.entertainmentIsChecked,
      otherIsChecked: this.otherIsChecked,
    };

    const modal = await this.modalCtrl.create({
      component: ExpensesFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { filtersList: await this.filtersList },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.foodIsChecked = await data.foodIsChecked;
      this.hotelIsChecked = await data.hotelIsChecked;
      this.entertainmentIsChecked = await data.entertainmentIsChecked;
      this.otherIsChecked = await data.otherIsChecked;
      await this.updateView();
    }
  }
}
