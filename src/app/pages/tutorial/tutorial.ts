import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { MenuController, IonSlides } from "@ionic/angular";

import { Storage } from "@ionic/storage";

@Component({
  selector: "page-tutorial",
  templateUrl: "tutorial.html",
  styleUrls: ["./tutorial.scss"],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild("slides", { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {}

  async startApp() {
    await this.router
      .navigateByUrl("/home", { replaceUrl: true })
      .then(async () => await this.storage.set("ion_did_tutorial", true));
  }

  async onSlideChangeStart(event: any) {
    await event.target.isEnd().then(async (isEnd: any) => {
      this.showSkip = !isEnd;
    });
  }

  async ionViewWillEnter() {
    await this.storage.get("ion_did_tutorial").then(async (res) => {
      if (res === true) {
        await this.router.navigateByUrl("/home", { replaceUrl: true });
      }
    });
   await this.menu.enable(false);
  }

  async ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    await this.menu.enable(true);
  }
}
