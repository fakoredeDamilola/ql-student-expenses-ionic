import { Component } from "@angular/core";
import { Expense } from "@app/_models";
import { AccountService, AlertService } from "@app/_services";
import * as moment from "moment";

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

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  async ionViewWillEnter() {
    // Reset because of weird behavior noticed
    this.expensesTotal=0;
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    this.userId = this.accountService.accountValue.id;
    //console.log(this.userId);
    (await this.accountService.getAllExpensesOnAccount(this.userId))
      .forEach(async (Element) => {
        console.log(Element);
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

  ionViewWillLeave(){
    this.expensesTotal =0;
  }
}
