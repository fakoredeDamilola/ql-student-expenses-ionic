import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { Expense } from "@app/_models";
import * as moment from "moment";

@Component({
  selector: "page-student-details",
  templateUrl: "student-details.html",
  styleUrls: ["./student-details.scss"],
})
export class StudentDetailsPage {

  student={id:"", firstName:"", lastName:"", email:"", created:"", updated:"", lastLogin:"", isOnline:false, isVerified:false };


  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  studentExpenses: [Expense];
  expensesLength: number;
  reportName: string;
  isVerified: boolean;
  totalOfExpenses: number = 0;
  deadData = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //skeleton
  data: boolean;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.data = false;
    // reseting this because of a bug noticed..
    this.totalOfExpenses = 0;
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading).present();
    this.student.id = this.route.snapshot.paramMap.get("studentId");
    // get id out of url for non admins
    if (this.accountService.accountValue.role != "Admin") {
      window.history.replaceState(
        {},
        document.title,
        "/" + "reports-manager/students/student-details"
      );
    }

    (await this.accountService.getById(this.student.id))
      .forEach(async (Element) => {
        this.student = Element;
        this.studentExpenses = Element.studentExpenses;
        this.expensesLength = Element.studentExpenses.length;
      })
      .then(async () => {
        //calculate expenses total
        for (let i = 0; i < this.expensesLength; i++) {
          this.totalOfExpenses += Number(this.studentExpenses[i].expenseCost);
          this.studentExpenses[i].created = moment(
            this.studentExpenses[i].created
          ).format("MM-DD-YYYY @HH:mm:ss");
        }
        this.totalOfExpenses = Number(this.totalOfExpenses.toFixed(2));
      })
      .finally(async () => {
        setTimeout(async () => {
          this.data = true;
          (await this.loading).dismiss();
        }, 100);
      });
  }

  async removeStudent() {
    this.alertService.createToastAlert(
      "Currently ONLY Admins Can Delete/Remove Accounts",
      "warning",
      8000
    );
  }
}
