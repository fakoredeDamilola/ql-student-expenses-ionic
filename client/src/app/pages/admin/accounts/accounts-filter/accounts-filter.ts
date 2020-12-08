import { Component } from "@angular/core";
import { Config, ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "page-schedule-filter",
  templateUrl: "accounts-filter.html",
  styleUrls: ["./accounts-filter.scss"],
})
export class AccountsFilterPage {
  ios: boolean;

  //adminsIsChecked: boolean=true;
  adminsIsChecked: boolean;
  studentsIsChecked: boolean;
  reportsManagersIsChecked: boolean;

  filtersList: any;

  constructor(
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.ios = this.config.get("mode") === `ios`;

    const filtersListComingIn = this.navParams.get("filtersList");

    this.adminsIsChecked = filtersListComingIn.adminsIsChecked;
    this.studentsIsChecked = filtersListComingIn.studentsIsChecked;
    this.reportsManagersIsChecked =
      filtersListComingIn.reportsManagersIsChecked;

    //console.log(filtersListComingIn,"yo Filters List Coming In");
  }

  selectAll(check: boolean) {}

  applyFilters() {
    // Pass back a new array of track names to exclude
    this.filtersList = {
      adminsIsChecked: this.adminsIsChecked,
      studentsIsChecked: this.studentsIsChecked,
      reportsManagersIsChecked: this.reportsManagersIsChecked,
    };
    this.dismiss(this.filtersList);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    //console.log("filters list after done with modal",data)
    this.modalCtrl.dismiss(data);
  }
}
