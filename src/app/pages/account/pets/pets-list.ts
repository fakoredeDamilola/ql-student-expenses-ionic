import { Component } from "@angular/core";
import { AccountService, AlertService } from "@app/_services";

@Component({
  selector: "page-pets-list",
  templateUrl: "pets-list.html",
  styleUrls: ["./pets-list.scss"],
})
export class PetsListPage {
  petsList: any;
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
      (await this.accountService.getAllPetsOnAccount(this.userId)).forEach(
      async (Element) => {
        //console.log(Element)
        this.petsList = Element;
      }

    );
    (await (this.loading)).dismiss();
  }
  async ionViewWillEnter(){
    (await (this.loading)).present();
  }

}
