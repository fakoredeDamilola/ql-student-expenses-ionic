import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({
  selector: 'page-properties-list',
  templateUrl: 'properties.html',
  styleUrls: ['./properties.scss'],
})
export class PropertiesListPage {
  propertiesList: any[] = [];
  userId: any;

  constructor(
    private accountService: AccountService
    ) {}

  async ionViewDidEnter() {
    //TODO USE PROPERTY get by propertyManagerId and load virtuals
    this.userId = this.accountService.accountValue.id;
    (await this.accountService.getById(this.userId)).forEach(async (Element)=>{
      //console.log(Element.propertyManagerProperties);
      this.propertiesList = Element.propertyManagerProperties;
    });
  }
}
