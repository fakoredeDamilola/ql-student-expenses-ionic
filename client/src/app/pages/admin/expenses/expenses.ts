import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config,
} from "@ionic/angular";

import { ExpensesFilterPage } from "./expenses-filter/expenses-filter";
import { UserData } from "@app/providers/user-data";
import { AccountService, AlertService, ExpenseService } from "@app/_services";
import { Account, Expense } from "@app/_models";
import * as moment from "moment";

@Component({
  selector: "page-expenses",
  templateUrl: "expenses.html",
  styleUrls: ["./expenses.scss"],
})
export class ExpensesPage {
  // Gets a reference to the list element

  ios: boolean;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  loading: any;
  allAccounts: any | [Account];
  adminsIsChecked: boolean;
  petOwnersIsChecked: boolean;
  propertyManagersIsChecked: boolean;
  filtersList: any;
  currentRoute: string = this.router.url;

  adminCondition: string = "";
  petOwnerCondition: string = "";
  propertyManagerCondition: string = "";
  allExpenses: any | [Expense];

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
    private expenseService: ExpenseService,
    private acountService: AccountService
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Admin Student Expenses");
    this.adminsIsChecked = true;
    this.petOwnersIsChecked = true;
    this.propertyManagersIsChecked = true;

    (await this.loading).present();
    //this.updateSchedule();
    this.ios = (await this.config.get("mode")) === "ios";
    (await this.expenseService.getAll())
      .forEach(async (Element) => {
        this.allExpenses = Element;
        console.log(this.allExpenses, "right here");
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
        }, 300);
      });
  }

  // Updates mani view from filter...very cool
  async updateView() {
    // TODO make this a switch case statement
    if (this.adminsIsChecked == false) {
      this.adminCondition = "Admin";
    }
    if (this.adminsIsChecked == true) {
      this.adminCondition = "";
    }
    if (this.petOwnersIsChecked == false) {
      this.petOwnerCondition = "User";
    }
    if (this.petOwnersIsChecked == true) {
      this.petOwnerCondition = "";
    }
    if (this.propertyManagersIsChecked == false) {
      this.propertyManagerCondition = "PropertyManager";
    }
    if (this.propertyManagersIsChecked == true) {
      this.propertyManagerCondition = "";
    }
  }

  async presentFilter() {
    this.filtersList = {
      adminsIsChecked: this.adminsIsChecked,
      petOwnersIsChecked: this.petOwnersIsChecked,
      propertyManagersIsChecked: this.propertyManagersIsChecked,
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
      this.adminsIsChecked = await data.adminsIsChecked;
      this.petOwnersIsChecked = await data.petOwnersIsChecked;
      this.propertyManagersIsChecked = await data.propertyManagersIsChecked;
      this.updateView();
    }
  }
}
