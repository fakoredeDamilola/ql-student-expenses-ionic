import { Component } from '@angular/core';
import { ConferenceData } from '@app/providers/conference-data';
import { AccountService, PetService } from '@app/_services';

@Component({
  selector: 'page-pets-list',
  templateUrl: 'pets-list.html',
  styleUrls: ['./pets-list.scss'],
})
export class PetsListPage {
  speakers: any[] = [];

  petsList: any[] = [];

  constructor(
    public confData: ConferenceData,
    public account: AccountService
    ) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
      this.petsList = this.account.accountValue.pets;

      //console.log(this.petsList,"<---here???")

    });
  }
}
