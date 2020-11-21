import { Component } from '@angular/core';
import { AccountService, AlertService } from '@app/_services';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'page-properties-list',
  templateUrl: 'properties.html',
  styleUrls: ['./properties.scss'],
})
export class PropertiesListPage {
  propertiesList: any;
  propertyManagerId: any;
  loading: any;

  constructor(
    private accountService: AccountService,
    private loadingController: LoadingController,
    private alertService: AlertService
    ) {
      this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    }

  async ionViewDidEnter() {
    //TODO USE PROPERTY get by propertyManagerId and load virtuals
    this.propertyManagerId = this.accountService.accountValue.id;
    (await this.accountService.getAllPropertiesOnAccount(this.propertyManagerId)).forEach(async (Element)=>{
      //console.log(Element.propertyManagerProperties);
      this.propertiesList = Element;
      //console.log(Element)
    }).then(async () => {
      {
        (await this.loading).dismiss();
      }
    });
  }


  async ionViewWillEnter(){
    ( await (this.loading)).present();
  }

  async ionViewWillExit(){
    ( await (this.loading)).present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: "Pet Check &#10003;",
      translucent: true,
      //duration:500,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    return loading;
  }
}
