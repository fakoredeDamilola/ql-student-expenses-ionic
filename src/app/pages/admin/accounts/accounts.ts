import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config,
} from "@ionic/angular";

import { AccountsFilterPage } from "./accounts-filter/accounts-filter";
import { UserData } from "@app/providers/user-data";
import { AccountService, AlertService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
  selector: "page-schedule",
  templateUrl: "accounts.html",
  styleUrls: ["./accounts.scss"],
})
export class AccountsPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild("allAccountsList", { static: true }) allAccountsList: IonList;

  ios: boolean;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  loading: any;
  allAccounts: any|[Account];
  adminsIsChecked:boolean;
  petOwnersIsChecked:boolean
  propertyManagersIsChecked:boolean;
  filtersList:any;

  adminCondition:string ='';
  petOwnerCondition:string =''
  propertyManagerCondition:string =''


  constructor(
    public alertCtrl: AlertController,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private acountService: AccountService
  ) {
    this.loading = this.alertService.presentLoading('Admin Pet Check&#10003; ');
  }


  async ngOnInit() {
    this.adminsIsChecked=true;
    this.petOwnersIsChecked=true;
    this.propertyManagersIsChecked=true;

    (await this.loading).present();
    //this.updateSchedule();
    this.ios = await this.config.get("mode") === "ios";
   (await this.acountService.getAll()).forEach(async Element=>{
      this.allAccounts = Element;
      console.log(this.allAccounts,"right here")
    }).then(async ()=>{
      (await this.loading).dismiss();
    });
  }

  // Updates mani view from filter...very cool
  async updateView() {
    // TODO make this a switch case statement
    if(this.adminsIsChecked==false){
      this.adminCondition='Admin';
    }
    if(this.adminsIsChecked==true){
      this.adminCondition='';
    }
    if(this.petOwnersIsChecked==false){
      this.petOwnerCondition='User';
    }
    if(this.petOwnersIsChecked==true){
      this.petOwnerCondition='';
    }
    if(this.propertyManagersIsChecked==false){
      this.propertyManagerCondition='PropertyManager';
    }
    if(this.propertyManagersIsChecked==true){
      this.propertyManagerCondition='';
    }

  }

  async presentFilter() {
    this.filtersList= {
      'adminsIsChecked':this.adminsIsChecked,
      'petOwnersIsChecked':this.petOwnersIsChecked,
      'propertyManagersIsChecked':this.propertyManagersIsChecked
    }

    const modal = await this.modalCtrl.create({
      component: AccountsFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { filtersList: await this.filtersList }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.adminsIsChecked = await data.adminsIsChecked;
      this.petOwnersIsChecked = await data.petOwnersIsChecked;
      this.propertyManagersIsChecked = await data.propertyManagersIsChecked;
      this.updateView();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      await this.removeFavorite(
        slidingItem,
        sessionData,
        "Favorite already added"
      );
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      await slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [
          {
            text: "Close",
            role: "cancel",
          },
        ],
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }
  }

  async removeFavorite(
    slidingItem: HTMLIonItemSlidingElement,
    sessionData: any,
    title: string
  ) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: "Would you like to remove this session from your favorites?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
        {
          text: "Remove",
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateView();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: Math.random() * 1000 + 500,
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
}
