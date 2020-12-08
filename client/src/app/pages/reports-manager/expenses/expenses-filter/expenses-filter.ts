import { Component } from "@angular/core";
import { Config, ModalController, NavParams } from "@ionic/angular";
import { filter } from "rxjs/operators";

@Component({
  selector: "page-expenses-filter",
  templateUrl: "expenses-filter.html",
  styleUrls: ["./expenses-filter.scss"],
})
export class ExpensesFilterPage {
  ios: boolean;
  foodIsChecked: boolean;
  hotelIsChecked: boolean;
  entertainmentIsChecked: boolean;
  otherIsChecked: boolean;

  filtersList: any;

  constructor(
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.ios = this.config.get("mode") === `ios`;

    const filtersListComingIn = this.navParams.get("filtersList");

    this.foodIsChecked = filtersListComingIn.foodIsChecked;
    this.hotelIsChecked = filtersListComingIn.hotelIsChecked;
    this.entertainmentIsChecked = filtersListComingIn.entertainmentIsChecked;
    this.otherIsChecked = filtersListComingIn.otherIsChecked;
  }

  selectAll(check: boolean) {}

  applyFilters() {
    // Pass back a new array of track names to exclude
    this.filtersList = {
      foodIsChecked: this.foodIsChecked,
      hotelIsChecked: this.hotelIsChecked,
      entertainmentIsChecked: this.entertainmentIsChecked,
      otherIsChecked: this.otherIsChecked,
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
