import { Route } from '@angular/compiler/src/core';
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
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
  currentRoute: string = this.router.url;

  constructor(
    private account: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    this.userId = this.account.accountValue.id;
    if(this.account.accountValue.role=='Admin'){
      this.userId =this.route.snapshot.paramMap.get("accountId");
      if(this.route.snapshot.paramMap.get("accountId")==null){
        this.userId = this.account.accountValue.id;
      }

    }
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
