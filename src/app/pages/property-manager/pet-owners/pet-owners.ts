import { Component } from "@angular/core";
import { Account } from "@app/_models";
import { AccountService } from "@app/_services";

@Component({
  selector: "page-pet-owners-list",
  templateUrl: "pet-owners.html",
  styleUrls: ["./pet-owners.scss"],
})
export class PetOwnersListPage {
  petOwnersList: any;
  userId: any;

  constructor(private account: AccountService) {}

  async ionViewDidEnter() {
    this.userId = this.account.accountValue.id;
    (await this.account.getAllPetOwnersInProperties(this.userId)).forEach(
      async (element) => {
        this.petOwnersList = element;
      }
    );
    //console.log(await this.petOwnersList)
  }
}
