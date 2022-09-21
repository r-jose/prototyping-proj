import { Directive, Input, Optional, ElementRef } from '@angular/core';

import { UiTourStep, StepType } from './steps';
import { UiTourDirective } from './ui-tour.directive';

@Directive({
  selector: '[appUiTourStep]'
})
export class UiTourStepDirective implements UiTourStep {
  @Input('appUiTourStep') content!: string;

  @Input('appUiTourStepType') type: StepType = StepType.ALL;

  constructor(
    @Optional() private uiTour: UiTourDirective,
    public el: ElementRef
  ) {}

  ngOnInit() {
    if (this.uiTour) {
      this.uiTour.register(this);
    }
  }
}
