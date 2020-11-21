import { Component } from "@angular/core";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-pets-list",
  templateUrl: "pets.html",
  styleUrls: ["./pets.scss"],
})
export class PetsListPage {
  propertyManagerId: string;
  petsList: any;
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    this.propertyManagerId = this.accountService.accountValue.id;
    (await this.accountService.getAllPetsInProperties(this.propertyManagerId))
      .forEach(async (element) => {
        this.petsList = element;
        console.log(this.petsList);
      })
      .then(async () => {
        {
          (await this.loading).dismiss();
        }
      });
  }

  async ionViewWillEnter() {
    (await this.loading).present();
  }
}
