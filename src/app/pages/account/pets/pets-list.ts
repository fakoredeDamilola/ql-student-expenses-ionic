import { Component } from "@angular/core";
import { AccountService } from "@app/_services";

@Component({
  selector: "page-pets-list",
  templateUrl: "pets-list.html",
  styleUrls: ["./pets-list.scss"],
})
export class PetsListPage {
  petsList: any;
  userId: string;

  constructor(private accountService: AccountService) {}

  async ionViewDidEnter() {
    this.userId = this.accountService.accountValue.id;
    //console.log(this.userId);
      (await this.accountService.getAllPetsOnAccount(this.userId)).forEach(
      async (Element) => {
        console.log(Element)
        this.petsList = Element;
      }
    );
  }
}
