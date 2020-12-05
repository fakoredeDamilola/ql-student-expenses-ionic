import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VerifyEmailComponent } from "@app/pages/account/verify-email/verify-email.component";
import { AuthGuard } from "@app/_helpers";
import { Role } from "@app/_models";

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
