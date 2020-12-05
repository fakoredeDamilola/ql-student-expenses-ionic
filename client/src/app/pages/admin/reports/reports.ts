import { Component, ViewChild } from "@angular/core";
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

import { ReportsFilterPage } from "./reports-filter/reports-filter";
import { UserData } from "@app/providers/user-data";
import { AccountService, AlertService, ReportService } from '@app/_services';
import { Account, Report } from '@app/_models';

@Component({
  selector: "page-admin-reports",
  templateUrl: "reports.html",
  styleUrls: ["./reports.scss"],
})
export class ReportsPage  {
  // Gets a reference to the list element
  @ViewChild("allAccountsList", { static: true }) allAccountsList: IonList;

  ios: boolean;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  loading: any;
  allReports: any|[Report];
  adminsIsChecked:boolean;
  petOwnersIsChecked:boolean
  ReportManagersIsChecked:boolean;
  filtersList:any;

  adminCondition:string ='';
  petOwnerCondition:string =''
  ReportManagerCondition:string =''
  currentRoute: string = this.router.url;



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
    private acountService: AccountService,
    private reportService: ReportService
  ) {
    this.loading = this.alertService.presentLoading('Admin Pet Check&#10003; ');
  }

  async ionViewWillEnter(){
    this.adminsIsChecked=true;
    this.petOwnersIsChecked=true;
    this.ReportManagersIsChecked=true;

    (await this.loading).present();
    //this.updateSchedule();
    this.ios = await this.config.get("mode") === "ios";
   (await this.reportService.getAll()).forEach(async Element=>{
      this.allReports = Element;
      console.log(this.allReports,"right here")
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
    if(this.ReportManagersIsChecked==false){
      this.ReportManagerCondition='ReportManager';
    }
    if(this.ReportManagersIsChecked==true){
      this.ReportManagerCondition='';
    }

  }

  async presentFilter() {
    this.filtersList= {
      'adminsIsChecked':this.adminsIsChecked,
      'petOwnersIsChecked':this.petOwnersIsChecked,
      'ReportManagersIsChecked':this.ReportManagersIsChecked
    }

    const modal = await this.modalCtrl.create({
      component: ReportsFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { filtersList: await this.filtersList }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.adminsIsChecked = await data.adminsIsChecked;
      this.petOwnersIsChecked = await data.petOwnersIsChecked;
      this.ReportManagersIsChecked = await data.ReportManagersIsChecked;
      this.updateView();
    }
  }

}
