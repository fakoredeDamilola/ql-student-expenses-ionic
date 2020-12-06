import { Component } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";
import { LoadingController } from "@ionic/angular";
import { Location } from "@angular/common";

@Component({
  selector: "page-reports-list",
  templateUrl: "reports.html",
  styleUrls: ["./reports.scss"],
})
export class ReportsListPage {
  queryText = "";
  showSearchbar: boolean;
  ios: boolean;
  filtersList: any;
  reportsList: any;
  reportsManagerId: any;
  loading: any;
  currentRoute: string = this.router.url;

  constructor(
    private accountService: AccountService,
    private loadingController: LoadingController,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {

  }

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    //TODO USE reports get by reportsManagerId and load virtuals
    (await this.loading).present();
    this.reportsManagerId = this.accountService.accountValue.id;
    //console.log(this.router.url); //  /routename

    if (this.accountService.accountValue.role == "Admin") {
      this.reportsManagerId = this.route.snapshot.paramMap.get("accountId");

      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.reportsManagerId = this.accountService.accountValue.id;
      }
    }
    (
      await this.accountService.getAllReportsOnAccount(
        this.reportsManagerId
      )
    )
      .forEach(async (Element) => {
        //console.log(Element.reportsManagerReports);
        this.reportsList = Element;
        console.log(Element);
      })
      .finally(async () => {
        setTimeout(async ()=>{ (await this.loading).dismiss()},300);
      });
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
