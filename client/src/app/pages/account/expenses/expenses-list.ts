import { Component } from "@angular/core";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-expenses-list",
  templateUrl: "expenses-list.html",
  styleUrls: ["./expenses-list.scss"],
})
export class ExpensesListPage {
  expensesList: any;
  userId: string;
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
    ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    this.userId = this.accountService.accountValue.id;
    //console.log(this.userId);
      (await this.accountService.getAllExpensesOnAccount(this.userId)).forEach(
      async (Element) => {
        console.log(Element)
        this.expensesList = Element;
      }

    );
    (await (this.loading)).dismiss();
  }
  async ionViewWillEnter(){
    (await (this.loading)).present();
  }

}
