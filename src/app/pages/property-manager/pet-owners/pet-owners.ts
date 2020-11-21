import { Component } from "@angular/core";
import { Account } from "@app/_models";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-pet-owners-list",
  templateUrl: "pet-owners.html",
  styleUrls: ["./pet-owners.scss"],
})
export class PetOwnersListPage {
  petOwnersList: any;
  userId: any;
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    private account: AccountService,
    private alertService: AlertService
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    this.userId = this.account.accountValue.id;
    (await this.account.getAllPetOwnersInProperties(this.userId))
      .forEach(async (element) => {
        this.petOwnersList = element;
        console.log(this.petOwnersList);
      })
      .then(async () => {
        {
          (await this.loading).dismiss();
        }
      });
  }

  async ionViewWillEnter(){
    (await this.loading).present();
  }
}
