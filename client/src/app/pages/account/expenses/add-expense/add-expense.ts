import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, ExpenseService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { ExpenseOptions } from "@app/interfaces/expense-options";
import {Location} from '@angular/common';

@Component({
  selector: "page-add-expense",
  templateUrl: "add-expense.html",
  styleUrls: ["./add-expense.scss"],
})
export class AddExpensePage {
  account = this.accountService.accountValue
  submitted: boolean = false;
  userData: any;

  addExpense: ExpenseOptions = {
    expenseName: "",
    expenseCost:""
  };
  loading: Promise<HTMLIonLoadingElement>;
  savingExpense: Promise<HTMLIonLoadingElement>;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private expenseService: ExpenseService,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertService: AlertService,
    private _location: Location
  ) {
    this.loading = this.alertService.presentLoading("Student Expenses App");
    this.savingExpense = this.alertService.presentLoading("Saving expense...");
  }

  async ionViewWillEnter() {
    (await (this.loading)).present();
  }

  async ionViewDidEnter(){
    (await (this.loading)).dismiss();
  }

  async onAddExpense(form?: NgForm) {
    (await (this.savingExpense)).present();
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.createToastAlert(
        "Add To expenses failed, fields are invalid.....!",
        "danger",
        8000
      );
      (await (this.savingExpense)).dismiss();
      return;
    }
    form.value.studentId = this.account.id;
    form.value.reportId = this.account.reportId;
    console.log(this.account,'here')
    const accountId = this.route.snapshot.paramMap.get("accountId");
    //console.log("this accountId", accountId)
    if(accountId!=null){
      form.value.studentId = accountId;
    }
    //form.value.propertyId = this.account.propertyId;
    //form.value.propertyManagerId = this.account.propertyManagerId;

    this.expenseService
      .create(form.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          (await (this.savingExpense)).dismiss();
          //TODO Replace with toast alert
          this.alertService.createToastAlert(
            "Added Expense Successfully!",
            "success",
            5000
          );
          this._location.back();
        },
        error: async (error) => {
          (await (this.savingExpense)).dismiss();
          this.alertService.createToastAlert(
            "Add Expense Failed.....!",
            "danger",
            5000
          );
        },
      });
  }
}
