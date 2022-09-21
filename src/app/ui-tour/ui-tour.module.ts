import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';


import { UiTourDirective } from './ui-tour.directive';
import { UiTourStepDirective } from './ui-tour-step.directive';
import { UiTourDialogComponent } from './ui-tour-dialog/ui-tour-dialog.component';
import { StartUiTourComponent } from './start-ui-tour/start-ui-tour.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [UiTourDirective, UiTourStepDirective, UiTourDialogComponent, StartUiTourComponent],
  exports: [
    UiTourDirective, UiTourStepDirective
  ],
  entryComponents: [UiTourDialogComponent, StartUiTourComponent]
})
export class UiTourModule { }
