import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "@app/_models";
import { AccountService, AlertService } from "@app/_services";
import { Config, IonRouterOutlet, ModalController } from "@ionic/angular";

@Component({
  selector: "page-students-list",
  templateUrl: "students.html",
  styleUrls: ["./students.scss"],
})
export class StudentsListPage {
  studentsList: [Account] | undefined | Account;
  userId: string;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  queryText: string = "";
  showSearchbar: boolean;
  ios: boolean;
  deadData = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //skeleton
  data: boolean;
  roleViewer: string;
  backButtonDisabled: boolean;

  constructor(
    private account: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public modalCtrl: ModalController,
    public config: Config
  ) {}

  async ionViewWillEnter() {
    this.currentRoute.split("/")[1] == "reports-manager"
    ? (this.backButtonDisabled = true)
    : (this.backButtonDisabled = false);

    console.log(this.backButtonDisabled)
    this.ios = (await this.config.get("mode")) === "ios";
    this.data = false;
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    // TODO-Should probably make the bellow check a reusable componenet some how
    this.userId = this.account.accountValue.id;
    if (this.account.accountValue.role == "Admin") {
      this.roleViewer = "A";
      this.userId = this.route.snapshot.paramMap.get("accountId");
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.userId = this.account.accountValue.id;
      }
    }
    // Get all of this.userId's students <-----who is a reports managers so his/her userId
    (await this.account.getAllStudents(this.userId))
      .forEach(async (element) => {
        this.studentsList = element;
      })
      .finally(async () => {
        this.data = true;
        (await this.loading).dismiss();
      });
  }

  async ionViewDidEnter() {}
}
