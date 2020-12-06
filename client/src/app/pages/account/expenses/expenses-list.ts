import { Component } from "@angular/core";
import { Expense } from "@app/_models";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-expenses-list",
  templateUrl: "expenses-list.html",
  styleUrls: ["./expenses-list.scss"],
})
export class ExpensesListPage {
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
