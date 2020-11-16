import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({
  selector: 'page-properties-list',
  templateUrl: 'properties.html',
  styleUrls: ['./properties.scss'],
})
export class PropertiesListPage {
  propertiesList: any[] = [];

  constructor(
    public account: AccountService
    ) {}

  ionViewDidEnter() {
      this.propertiesList = this.account.accountValue.properties;
  }
}
