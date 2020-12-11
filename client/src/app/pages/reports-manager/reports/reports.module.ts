import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

import { ReportsListPage } from "./reports";
import { ReportsListPageRoutingModule } from "./reports-routing.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ReportsListPageRoutingModule,
  ],
  declarations: [ReportsListPage],
})
export class ReportsListModule {}
