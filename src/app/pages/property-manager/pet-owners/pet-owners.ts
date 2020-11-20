import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({
  selector: 'page-pet-owners-list',
  templateUrl: 'pet-owners.html',
  styleUrls: ['./pet-owners.scss'],
})
export class PetOwnersListPage {
  petOwnersList: any[] = [];

  constructor(
    private account: AccountService
    ) {}

  ionViewDidEnter() {
      this.petOwnersList = this.account.accountValue.properties;
  }
}
