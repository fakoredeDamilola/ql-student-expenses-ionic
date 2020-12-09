import { Component } from "@angular/core";
import { Expense } from "@app/_models";
import { AccountService, AlertService } from "@app/_services";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import * as moment from "moment";
import { ExpensesFilterPage } from "./expenses-filter/expenses-filter";

@Component({
  selector: "page-expenses-list",
  templateUrl: "expenses-list.html",
  styleUrls: ["./expenses-list.scss"],
})
export class ExpensesListPage {
  queryText = "";
  showSearchbar: boolean;
  ios: boolean;
  filtersList: any;
  expensesList: [Expense] | any;
  userId: string;
  loading: Promise<HTMLIonLoadingElement>;
  expensesListLength: number;
  expensesTotal: number = 0;

  foodIsChecked: boolean;
  hotelIsChecked: boolean;
  entertainmentIsChecked: boolean;
  otherIsChecked: boolean;
  foodCondition: string = "";
  hotelCondition: string = "";
  entertainmentCondition: string = "";
  otherCondition: string = "";

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    // Reset because of weird behavior noticed
    this.expensesTotal = 0;
    this.foodIsChecked = true;
    this.hotelIsChecked = true;
    this.entertainmentIsChecked = true;
    this.otherIsChecked = true;
    this.userId = this.accountService.accountValue.id;
    //console.log(this.userId);
    (await this.accountService.getAllExpensesOnAccount(this.userId))
      .forEach(async (Element) => {
        //console.log(Element);
        this.expensesList = Element;
        this.expensesListLength = this.expensesList.length;
      })
      .then(async () => {
        for (let i = 0; i < this.expensesListLength; i++) {
          this.expensesTotal += Number(this.expensesList[i].expenseCost);
        }
      })
      .then(async () => {
        this.expensesTotal = Number(this.expensesTotal.toFixed(2));
      })
      .then(async () => {
        for (let i = 0; i < this.expensesListLength; i++) {
          this.expensesList[i].created = moment(
            this.expensesList[i].created
          ).format("MM-DD-YYYY @HH:mm:ss");
        }
      })
      .finally(() => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });
  }

  ionViewWillLeave() {
    this.expensesTotal = 0;
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
