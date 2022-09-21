import { InjectionToken, ElementRef } from '@angular/core';

export const UI_TOUR_STEP_DATA = new InjectionToken<UiTourStep>('UI_TOUR_STEP_DATA');

// Why sum is 8??
export const enum StepType {
  ALL = -1,
  DASHBOARD = 1,
  TABLE = 2,
  CALENDAR = 4
}

export interface UiTourStep {
  content: string;
  el: ElementRef;
  type: StepType;
}
