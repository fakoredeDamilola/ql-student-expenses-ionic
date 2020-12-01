import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Photo, PhotoService } from "@app/_services/photo.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "pet-image",
  templateUrl: "pet-image.html",
  styleUrls: ["pet-image.scss"],
})
export class PetImagePage {
  petId: any;

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get("petId");
    await this.photoService.loadSaved(this.petId);
    console.log(this.petId)
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
            this.photoService.deletePicture(photo, position, this.petId);
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
