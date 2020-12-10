import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";
import { IonRouterOutlet, ModalController } from "@ionic/angular";

@Component({
  selector: "page-students-list",
  templateUrl: "students.html",
  styleUrls: ["./students.scss"],
})
export class StudentsListPage {
  studentsList: any;
  userId: any;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  queryText = "";
  showSearchbar: boolean;
  ios: boolean;

  constructor(
    private account: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public modalCtrl: ModalController
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    // TODO-Should probably make the bellow check a reusable componenet some how
    this.userId = this.account.accountValue.id;
    if (this.account.accountValue.role == "Admin") {
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
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 100);
      });
  }

  async ionViewDidEnter() {}
}
