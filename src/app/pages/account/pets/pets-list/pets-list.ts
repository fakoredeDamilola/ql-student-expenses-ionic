import { Component } from '@angular/core';
import { ConferenceData } from '@app/providers/conference-data';

@Component({
  selector: 'page-pets-list',
  templateUrl: 'pets-list.html',
  styleUrls: ['./pets-list.scss'],
})
export class PetsListPage {
  speakers: any[] = [];

  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }
}
