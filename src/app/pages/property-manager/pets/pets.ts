import { Component } from "@angular/core";
import { AccountService } from "@app/_services";

@Component({
  selector: "page-pets-list",
  templateUrl: "pets.html",
  styleUrls: ["./pets.scss"],
})
export class PetsListPage {
  propertyManagerId: string;
  petsList: any;

  constructor(private accountService: AccountService) {}

  async ionViewDidEnter() {
    this.propertyManagerId = this.accountService.accountValue.id;
    (
      await this.accountService.getAllPetsInProperties(this.propertyManagerId)
    ).forEach(async (element) => {
      this.petsList = element;
      console.log(this.petsList)
    });
  }
}
