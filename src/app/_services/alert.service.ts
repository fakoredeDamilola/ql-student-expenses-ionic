import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    constructor(private toastCtrl: ToastController, private loadingController: LoadingController){}

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // core alert method
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }



    async createToastAlert(messageParam: string, colorParam?: 'primary'|'warning'|'danger'|'success',durationParam?:number) {
      const toast = await this.toastCtrl.create({
        message: messageParam,
        position: "bottom",
        duration:durationParam,
        color:colorParam,
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


    async presentLoading(messageParam: string, durationParam: number) {
      const loading = await this.loadingController.create({
        message: messageParam,
        duration: durationParam
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }



}
