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
import { AlertService, ReportService } from "@app/_services";
import { Report } from "@app/_models";
import * as moment from "moment";

@Component({
  selector: "page-admin-reports",
  templateUrl: "reports.html",
  styleUrls: ["./reports.scss"],
})
export class ReportsPage {
  // Gets a reference to the list element
  // may use later
  @ViewChild("allAccountsList", { static: true }) allAccountsList: IonList;

  ios: boolean;
  queryText: string = "";
  segment = "all";
  showSearchbar: boolean;
  allReports: any | [Report];
  adminsIsChecked: boolean;
  petOwnersIsChecked: boolean;
  ReportManagersIsChecked: boolean;
  filtersList: any;
  deadData = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //skeleton

  adminCondition: string = "";
  petOwnerCondition: string = "";
  ReportManagerCondition: string = "";
  currentRoute: string = this.router.url;
  data: boolean;
  loading: Promise<HTMLIonLoadingElement>;

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
    private reportService: ReportService
  ) {}

  async ionViewWillEnter() {
    this.data = false;
    this.loading = this.alertService.presentLoading("Admin Student Expenses");
    (await this.loading)
      .present()
      .then(async () => {
        this.adminsIsChecked = true;
        this.petOwnersIsChecked = true;
        this.ReportManagersIsChecked = true;
        this.ios = (await this.config.get("mode")) === "ios";
      })
      .then(async () => {
        await (await this.reportService.getAll())
          .forEach(async (Element) => {
            //console.log(Element);
            this.allReports = Element;
          })
          .then(async () => {
            const reportsCount = this.allReports.length;
            for (let i = 0; i < reportsCount; i++) {
              this.allReports[i].created = moment(
                this.allReports[i].created
              ).format("MM-DD-YYYY @HH:mm:ss");
            }
          });
      })
      .finally(async () => {
        this.data = true;
        (await this.loading).dismiss();
      });
  }
}
