import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({
  selector: 'page-pets-list',
  templateUrl: 'pets.html',
  styleUrls: ['./pets.scss'],
})
export class PetsListPage {
  propertiesList: any[] = [];

  constructor(
    private account: AccountService
    ) {}

  ionViewDidEnter() {
    // get all propertiesPets??
     // this.propertiesList = this.account.accountValue.properties;
  }
}
