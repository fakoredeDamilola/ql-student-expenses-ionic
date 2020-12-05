import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { StudentsFilterPage } from './students-filter/students-filter';

@Component({
  selector: "page-students-list",
  templateUrl: "students.html",
  styleUrls: ["./students.scss"],
})
export class StudentsListPage {
  petOwnersList: any;
  userId: any;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  ios: boolean;
  filtersList:any;
  adminsIsChecked:boolean;
  petOwnersIsChecked:boolean
  propertyManagersIsChecked:boolean;
  adminCondition: string;
  petOwnerCondition: string;
  propertyManagerCondition: string;

  constructor(
    private account: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

async ionViewDidEnter() {
    (await this.loading).present();
    this.adminsIsChecked=true;
    this.petOwnersIsChecked=true;
    this.propertyManagersIsChecked=true;
    this.userId = this.account.accountValue.id;
    if (this.account.accountValue.role == "Admin") {
      this.userId = this.route.snapshot.paramMap.get("accountId");
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.userId = this.account.accountValue.id;
      }
    }
    (await this.account.getAllStudentsInReports(this.userId))
      /*.forEach(async (element) => {
        this.petOwnersList = element;
        console.log(this.petOwnersList);
      })
      .then(async () => {
        (await this.loading).dismiss();
      });*/
  }

  async ionViewWillEnter() {
    (await this.loading).present();
  }


  async presentFilter() {
    this.filtersList= {
      'adminsIsChecked':this.adminsIsChecked,
      'petOwnersIsChecked':this.petOwnersIsChecked,
      'propertyManagersIsChecked':this.propertyManagersIsChecked
    }

    const modal = await this.modalCtrl.create({
      component: StudentsFilterPage,
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


    // Updates mani view from filter...very cool
    async updateView() {
      // TODO make this a switch case statement
      if(this.filtersList.adminsIsChecked==false){
        this.adminCondition='Admin';
      }
      if(this.filtersList.adminsIsChecked==true){
        this.adminCondition='';
      }
      if(this.filtersList.petOwnersIsChecked==false){
        this.petOwnerCondition='User';
      }
      if(this.filtersList.petOwnersIsChecked==true){
        this.petOwnerCondition='';
      }
      if(this.filtersList.propertyManagersIsChecked==false){
        this.propertyManagerCondition='PropertyManager';
      }
      if(this.filtersList.propertyManagersIsChecked==true){
        this.propertyManagerCondition='';
      }

    }
}
