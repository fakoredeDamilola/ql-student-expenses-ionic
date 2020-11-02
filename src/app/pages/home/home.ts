import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

import { PopoverController } from '@ionic/angular';

import { HomePopoverPage } from './home-popover/home-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage {
  // All the logged in users account information!!!
  account = this.accountService.accountValue;
  location = 'madison';
  conferenceDate = '2047-05-17';

  selectOptions = {
    header: 'Select a Location'
  };

  constructor(public popoverCtrl: PopoverController,private accountService: AccountService) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: HomePopoverPage,
      event
    });
    await popover.present();
  }
}
