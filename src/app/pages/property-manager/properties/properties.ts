import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({
  selector: 'page-properties-list',
  templateUrl: 'properties.html',
  styleUrls: ['./properties.scss'],
})
export class PropertiesListPage {
  propertiesList: any;
  propertyManagerId: any;

  constructor(
    private accountService: AccountService
    ) {}

  async ionViewDidEnter() {
    //TODO USE PROPERTY get by propertyManagerId and load virtuals
    this.propertyManagerId = this.accountService.accountValue.id;
    (await this.accountService.getAllPropertiesOnAccount(this.propertyManagerId)).forEach(async (Element)=>{
      //console.log(Element.propertyManagerProperties);
      this.propertiesList = Element;
      console.log(Element)
    });
  }
}
