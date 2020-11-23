import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'page-pets-filter',
  templateUrl: 'pets-filter.html',
  styleUrls: ['./pets-filter.scss'],
})
export class PetsFilterPage {
  ios: boolean;

  //adminsIsChecked: boolean=true;
  adminsIsChecked:boolean;
  petOwnersIsChecked:boolean;
  propertyManagersIsChecked:boolean;

  filtersList:any;


  constructor(
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    const filtersListComingIn = this.navParams.get('filtersList');

    this.adminsIsChecked = filtersListComingIn.adminsIsChecked;
    this.petOwnersIsChecked = filtersListComingIn.petOwnersIsChecked;
    this.propertyManagersIsChecked = filtersListComingIn.propertyManagersIsChecked;


    //console.log(filtersListComingIn,"yo Filters List Coming In");
  }

  selectAll(check: boolean) {

  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    this.filtersList={
      'adminsIsChecked':this.adminsIsChecked,
      'petOwnersIsChecked':this.petOwnersIsChecked,
      'propertyManagersIsChecked':this.propertyManagersIsChecked
    }
    this.dismiss(this.filtersList);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    //console.log("filters list after done with modal",data)
    this.modalCtrl.dismiss(data);
  }
}
