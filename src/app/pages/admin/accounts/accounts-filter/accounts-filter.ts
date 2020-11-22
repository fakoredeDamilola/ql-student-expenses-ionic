import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { ConferenceData } from '@app/providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'accounts-filter.html',
  styleUrls: ['./accounts-filter.scss'],
})
export class AccountsFilterPage {
  ios: boolean;

  adminsIsChecked: boolean;
  petOwnersIsChecked: boolean;
  propertyManagersIsChecked: boolean;

  constructor(
    public confData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.get('excludedTracks');

  }

  selectAll(check: boolean) {

  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    /*const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);*/
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
