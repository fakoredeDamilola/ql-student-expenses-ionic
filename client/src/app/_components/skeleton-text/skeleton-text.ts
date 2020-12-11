// TODO ADD GENERIC SKELETON VIEW COMPONENT

import { Component } from "@angular/core";

@Component({
  selector: "skeleton-text",
  template: `
    <!-- Skeleton screen -->
    <ion-grid fixed>
      <ion-row>
        <ion-col>
          <ion-card>
            <!--<ion-card-header>-->
            <ion-item detail="false" lines="none">
              <ion-avatar slot="start"> </ion-avatar>
              <ion-label>
                <h2>nothing</h2>
                <h4>nothing</h4>
                <p>nothing</p>
                <p>nothing</p>
              </ion-label>
            </ion-item>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
})
export class SkeletonText {
  constructor() {}
}
