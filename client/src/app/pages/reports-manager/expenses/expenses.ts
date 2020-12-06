import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-expenses-list",
  templateUrl: "expenses.html",
  styleUrls: ["./expenses.scss"],
})
export class ExpensesListPage {
  queryText = "";
  showSearchbar: boolean;
  ios: boolean;
  filtersList: any;
  reportsManagerId: string;
  expensesList: any;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  userId: any;
  petOwnersList: any;
  reportsExpenses: any;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses App");
    (await this.loading).present();
    this.reportsManagerId = this.accountService.accountValue.id;

    if (this.accountService.accountValue.role == "Admin") {
      this.reportsManagerId = this.route.snapshot.paramMap.get("accountId");
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.reportsManagerId = this.accountService.accountValue.id;
      }
    }
    this.userId = this.accountService.accountValue.id;
    if (this.accountService.accountValue.role == "Admin") {
      this.userId = this.route.snapshot.paramMap.get("accountId");
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.userId = this.accountService.accountValue.id;
      }
    }
    (await this.accountService.getReportsExpenses(this.userId))
      .forEach(async (element) => {
        console.log(element);
        this.reportsExpenses = element;
        console.log(element, "This???");
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });
  }

  async ionViewDidlEnter() {

  }

  async presentFilter() {
    /*  this.filtersList= {
        'adminsIsChecked':this.adminsIsChecked,
        'petOwnersIsChecked':this.petOwnersIsChecked,
        'reportsManagersIsChecked':this.reportsManagersIsChecked
      }

      const modal = await this.modalCtrl.create({
        component: PetOwnersFilterPage,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: { filtersList: await this.filtersList }
      });
      await modal.present();

      const { data } = await modal.onWillDismiss();
      if (data) {
        this.adminsIsChecked = await data.adminsIsChecked;
        this.petOwnersIsChecked = await data.petOwnersIsChecked;
        this.reportsManagersIsChecked = await data.reportsManagersIsChecked;
        this.updateView();
      }*/
  }
}
