import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";
import { Config, LoadingController } from "@ionic/angular";
import { Location } from "@angular/common";
import * as moment from "moment";
import { Report } from "@app/_models";

@Component({
  selector: "page-reports-list",
  templateUrl: "reports.html",
  styleUrls: ["./reports.scss"],
})
export class ReportsListPage {
  queryText: string = "";
  showSearchbar: boolean;
  ios: boolean;
  filtersList: any;
  reportsList: [Report] | any; //TODO fix this
  reportsManagerId: string;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  deadData = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //skeleton
  data: boolean;
  roleViewer: string;
  backButtonDisabled: boolean;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public config: Config
  ) {}

  async ionViewWillEnter() {
    this.currentRoute.split("/")[1] == "reports-manager"
    ? (this.backButtonDisabled = true)
    : (this.backButtonDisabled = false);
    this.ios = (await this.config.get("mode")) === "ios";
    this.data = false;
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();

    this.reportsManagerId = this.accountService.accountValue.id;
    if (this.accountService.accountValue.role == "Admin") {
      this.roleViewer = "A";
      this.reportsManagerId = this.route.snapshot.paramMap.get("accountId");
      // If your an admin the account Id will be inside the url, removed for none admin views
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.reportsManagerId = this.accountService.accountValue.id;
      }
    }
    (await this.accountService.getAllReportsOnAccount(this.reportsManagerId))
      .forEach(async (Element) => {
        //console.log(Element.reportsManagerReports);
        this.reportsList = Element;
      })
      .then(async () => {
        const reportsCount = this.reportsList.length;
        for (let i = 0; i < reportsCount; i++) {
          this.reportsList[i].created = moment(
            this.reportsList[i].created
          ).format("MM-DD-YYYY @HH:mm:ss");
        }
      })
      .finally(async () => {
        this.data = true;
        (await this.loading).dismiss();
      });
  }
}
