import { Component } from '@angular/core';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'page-pets-list',
  templateUrl: 'pets-list.html',
  styleUrls: ['./pets-list.scss'],
})
export class PetsListPage {
  petsList: any[] = [];


  constructor(
    private account: AccountService,
    private alertService: AlertService
    ) {}

  async ionViewDidEnter() {
      this.petsList = this.account.accountValue.pets;
  }
}
