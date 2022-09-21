import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { UiTourDirective } from '../ui-tour.directive';

@Component({
  selector: 'app-start-ui-tour',
  templateUrl: './start-ui-tour.component.html',
  styleUrls: ['./start-ui-tour.component.css']
})
export class StartUiTourComponent implements OnInit {
  constructor(
    @Inject(forwardRef(() => UiTourDirective)) public tour: UiTourDirective,
    private overlayRef: OverlayRef
  ) { }
  ngOnInit(): void {
    setTimeout(()=>this.overlayRef.dispose(),15000);
  }

  start() {
    this.tour.start();
    this.overlayRef.dispose();
  }
}
