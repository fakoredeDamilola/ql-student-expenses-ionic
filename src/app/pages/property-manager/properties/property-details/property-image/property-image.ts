import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Photo, PhotoService } from "@app/_services/photo.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "property-image",
  templateUrl: "property-image.html",
  styleUrls: ["property-image.scss"],
})
export class PropertyImagePage {
  propertyId: any;

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get("propertyId");
    await this.photoService.loadSaved(this.propertyId);
    console.log(this.propertyId)
  }

  public async showActionSheet(photo: Photo, position: number) {
    console.log(photo,"this???");
    const actionSheet = await this.actionSheetController.create({

      header: "Photos",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.photoService.deletePicture(photo, position, this.propertyId);
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
