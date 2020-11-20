import { Component } from "@angular/core";
import { AccountService, AlertService } from "@app/_services";
import { Account } from "@app/_models";

@Component({
  selector: "page-pets-list",
  templateUrl: "pets-list.html",
  styleUrls: ["./pets-list.scss"],
})
export class PetsListPage {
  petsList: any[] = [];
  userAccount: any;
  userId: string;

  constructor(private accountService: AccountService) {}

  async ionViewDidEnter() {
    this.userId = this.accountService.accountValue.id;
    //console.log(this.userId);
    this.userAccount = (await this.accountService.getById(this.userId)).forEach(
      async (Element) => {
        console.log(Element)
        this.petsList = Element.petOwnerPets;
      }
    );
  }
}
