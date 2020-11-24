import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-pets-list",
  templateUrl: "pets.html",
  styleUrls: ["./pets.scss"],
})
export class PetsListPage {
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  ios: boolean;
  filtersList:any;
  propertyManagerId: string;
  petsList: any;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    this.propertyManagerId = this.accountService.accountValue.id;

    if (this.accountService.accountValue.role == "Admin") {
      this.propertyManagerId = this.route.snapshot.paramMap.get("accountId");
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.propertyManagerId = this.accountService.accountValue.id;
      }
    }
    (await this.accountService.getAllPetsInProperties(this.propertyManagerId))
      .forEach(async (element) => {
        this.petsList = element;
        console.log(this.petsList);
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }

  async ionViewWillEnter() {
    (await this.loading).present();
  }


  async presentFilter() {
    /*  this.filtersList= {
        'adminsIsChecked':this.adminsIsChecked,
        'petOwnersIsChecked':this.petOwnersIsChecked,
        'propertyManagersIsChecked':this.propertyManagersIsChecked
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
        this.propertyManagersIsChecked = await data.propertyManagersIsChecked;
        this.updateView();
      }*/
    }
}
