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

import { UserData } from "@app/providers/user-data";
import { AccountService, AlertService, ReportService } from "@app/_services";
import { Report } from "@app/_models";
import * as moment from "moment";

@Component({
  selector: "page-admin-reports",
  templateUrl: "reports.html",
  styleUrls: ["./reports.scss"],
})
export class ReportsPage {
  // Gets a reference to the list element
  @ViewChild("allAccountsList", { static: true }) allAccountsList: IonList;

  ios: boolean;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  loading: any;
  allReports: any | [Report];
  adminsIsChecked: boolean;
  petOwnersIsChecked: boolean;
  ReportManagersIsChecked: boolean;
  filtersList: any;

  adminCondition: string = "";
  petOwnerCondition: string = "";
  ReportManagerCondition: string = "";
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
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Admin Student Expenses");
    (await this.loading).present();
    this.adminsIsChecked = true;
    this.petOwnersIsChecked = true;
    this.ReportManagersIsChecked = true;
    this.ios = (await this.config.get("mode")) === "ios";

    (await this.reportService.getAll())
      .forEach(async (Element) => {
        this.allReports = Element;
        console.log(this.allReports, "right here");
      })
      .then(async () => {
        const reportsCount = this.allReports.length;
        for (let i = 0; i < reportsCount; i++) {
          this.allReports[i].created = moment(
            this.allReports[i].created
          ).format("MM-DD-YYYY @HH:mm:ss");
        }
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });
  }

}
