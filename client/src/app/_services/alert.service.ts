import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";


@Injectable({ providedIn: "root" })
export class AlertService {


  constructor(
    private toastCtrl: ToastController,
    private loadingController: LoadingController
  ) {}



  async createToastAlert(
    messageParam: string,
    colorParam?: "primary" | "warning" | "danger" | "success",
    durationParam?: number
  ) {
    const toast = await this.toastCtrl.create({
      message: messageParam,
      position: "bottom",
      duration: durationParam,
      color: colorParam,
      buttons: [
        {
          role: "cancel",
          text: "Ok",
        },
      ],
    });
    await toast.present();
    toast.onDidDismiss();
  }

  async presentLoading(messageParam: string) {
    const loading = this.loadingController.create({
      message: messageParam,
    });
      return loading;
  }
}
