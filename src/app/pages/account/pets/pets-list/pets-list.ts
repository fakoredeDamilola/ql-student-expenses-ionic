import { Component } from '@angular/core';
import { ConferenceData } from '@app/providers/conference-data';
import { AccountService, PetService } from '@app/_services';

@Component({
  selector: 'page-pets-list',
  templateUrl: 'pets-list.html',
  styleUrls: ['./pets-list.scss'],
})
export class PetsListPage {
  petsList: any[] = [];

  constructor(
    public confData: ConferenceData,
    public account: AccountService
    ) {}

  ionViewDidEnter() {
      this.petsList = this.account.accountValue.pets;
  }
}
