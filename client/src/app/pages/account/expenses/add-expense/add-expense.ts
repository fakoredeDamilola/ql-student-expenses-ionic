import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, ExpenseService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { ExpenseOptions } from "@app/interfaces/expense-options";
import { Location } from "@angular/common";

@Component({
  selector: "page-add-expense",
  templateUrl: "add-expense.html",
  styleUrls: ["./add-expense.scss"],
})
export class AddExpensePage {
  account = this.accountService.accountValue;
  submitted: boolean = false;

  addExpense: ExpenseOptions = {
    expenseName: "",
    expenseCost: "",
    expenseCategory: "",
  };
  loading: Promise<HTMLIonLoadingElement>;
  savingExpense: Promise<HTMLIonLoadingElement>;
  accountId: string;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private expenseService: ExpenseService,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertService: AlertService,
    private _location: Location
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    this.accountId = this.route.snapshot.paramMap.get("accountId"); //<----------potentially null for regular students
  }

  async ionViewDidEnter() {
    setTimeout(async () => {
      (await this.loading).dismiss();
    }, 300);
  }

  async onAddExpense(form?: NgForm) {
    this.savingExpense = this.alertService.presentLoading("Saving Expense...");
    (await this.savingExpense).present();
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.createToastAlert(
        "Add To Expenses Failed, Fields Are Invalid.....!",
        "danger",
        8000
      );
      setTimeout(async () => {
        (await this.savingExpense).dismiss();
      }, 300);
      return;
    }

    if (this.accountId) { //<------------------- Admin Is Adding Expense for somebody
      form.value.studentId = this.accountId;
      await (await this.accountService.getById(this.accountId)).forEach(
        async (Element) => {
          form.value.reportId = Element.reportId;
          form.value.reportsManagerId = Element.reportsManagerId;
        }
      );
    } else { //<--------------------------------Regular student adding their own expense
      form.value.studentId = this.account.id;
      form.value.reportId = this.account.reportId;
      form.value.reportsManagerId = this.account.reportsManagerId;
    }

    (await this.expenseService.create(form.value)).pipe(first()).subscribe({
      next: async () => {
        setTimeout(async () => {
          (await this.savingExpense).dismiss();
        }, 300);
        this.alertService.createToastAlert(
          "Added Expense Successfully!",
          "success",
          5000
        );
        this._location.back();
      },
      error: async (error) => {
        setTimeout(async () => {
          (await this.savingExpense).dismiss();
        }, 300);
        this.alertService.createToastAlert(
          "Add Expense Failed.....!",
          "danger",
          5000
        );
      },
    });
  }
}
