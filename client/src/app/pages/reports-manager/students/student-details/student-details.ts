import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first, toArray } from "rxjs/operators";
import { Expense, Report } from '@app/_models';

@Component({
  selector: "page-student-details",
  templateUrl: "student-details.html",
  styleUrls: ["./student-details.scss"],
})
export class StudentDetailsPage {
  studentId: any;
  //
  firstName: string;
  lastName: string;
  email: string;
  created: any;

  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  expenses: [Expense];
  expensesLength: number;
  report={  city:'', street:'', state:'', zip:'' };
  reportName: string;
  isVerified: boolean;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    private router: Router
  ) {
    this.loading = this.alertService.presentLoading("Expense Check &#10003;");
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.studentId = this.route.snapshot.paramMap.get("StudentId");
    // get id out of url
    if(this.accountService.accountValue.role!='Admin'){
      window.history.replaceState(
        {},
        document.title,
        "/" + "reports-manager/students/student-details"
      );
    }

    (await this.accountService.getById(this.studentId))
      .forEach(async (Element) => {
        this.firstName = Element.firstName;
        this.lastName = Element.lastName;
        this.email = Element.email;
        this.created = Element.created;
        this.isVerified = Element.isVerified;
        //this.expenses = Element.studentExpenses;
        this.expensesLength = this.expenses.length;
        //this.reportName = Element.studentReport.reportName;
        //this.report = Element.studentReport;
        console.log(Element);
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }


}
