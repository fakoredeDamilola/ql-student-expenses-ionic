import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { StudentsFilterPage } from "./students-filter/students-filter";

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
  filtersList: any;
  adminsIsChecked: boolean;
  studentsIsChecked: boolean;
  propertyManagersIsChecked: boolean;
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
  ) {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    this.adminsIsChecked = true;
    this.studentsIsChecked = true;
    this.propertyManagersIsChecked = true;
    this.userId = this.account.accountValue.id;
    if (this.account.accountValue.role == "Admin") {
      this.userId = this.route.snapshot.paramMap.get("accountId");
      if (this.route.snapshot.paramMap.get("accountId") == null) {
        this.userId = this.account.accountValue.id;
      }
    }
    (await this.account.getAllStudents(this.userId))
      .forEach(async (element) => {
        this.studentsList = element;
        console.log(this.studentsList);
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });
  }

  async ionViewDidEnter() {}




}
