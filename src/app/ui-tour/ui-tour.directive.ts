import { Directive, Injector, ViewContainerRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { UiTourStep, UI_TOUR_STEP_DATA, StepType } from './steps'
import { UiTourDialogComponent } from './ui-tour-dialog/ui-tour-dialog.component';
import { StartUiTourComponent } from './start-ui-tour/start-ui-tour.component';

@Directive({
  selector: '[appUiTour]',
  exportAs: 'appUiTour'
})
export class UiTourDirective implements OnInit, OnChanges {
  @Input('appUiTourType') type: StepType = StepType.ALL;

  /** List of all steps declared within this tour. */
  readonly globalSteps: UiTourStep[] = [];

  /** List of steps with same type as tour. */
  steps: UiTourStep[] = [];

  overlayRef!: OverlayRef;

  activeStepIndex: number = 0;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    // TODO: Start button should only appear when user have not completed ui tour.
    this.createStartButton();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { type } = changes;

    if (type && !type.firstChange) {
      /** When type changes, ensure that step with current type are selected. */
      this.steps = this.globalSteps.filter(s => s.type === this.type)
    }
  }

  createStartButton() {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().right('16px').top('16px')
    });

    const portal = new ComponentPortal(
      StartUiTourComponent,
      this.viewContainerRef,
      Injector.create({
        parent: this.injector,
        providers: [
          { provide: OverlayRef, useValue: overlayRef }
        ]
      })
    );

    overlayRef.attach(portal);
  }

  register(step: UiTourStep) {
    this.globalSteps.push(step);

    if ((this.type !== StepType.ALL && step.type === this.type) || this.type === StepType.ALL) {
      this.steps.push(step);
    }
  }

  start() {
    this.open(0);
  }

  open(index: number) {
    if (index > this.steps.length) {
      return;
    }

    this.activeStepIndex = index;

    // TODO: check whether step exists.
    if (index > this.steps.length - 1) {
      this.close();
    } else {
      const step = this.steps[this.activeStepIndex];
      this.overlayRef = this.createOverlay(step);
      const portal = this.createPortal(step);

      this.overlayRef.backdropClick().subscribe(() => {
        this.overlayRef.detach();
      });

      this.overlayRef.attach(portal);
    }

  }

  close() {
    this.overlayRef.dispose();
  }

  next() {
    this.close();

    this.open(++this.activeStepIndex);
    // (this.overlayRef.getConfig().positionStrategy as any).setOrigin(this.steps[++this.activeStepIndex].el)

    // this.overlayRef.updatePosition();
  }

  prev() {
    this.close();

    this.open(--this.activeStepIndex);
  }

  finish() {
    this.close();
  }

  private createInjector(step: UiTourStep): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: UI_TOUR_STEP_DATA, useValue: step }
      ]
    })
    // return new PortalInjector(this.injector, new WeakMap().set(UI_TOUR_STEP_DATA, step));
  }

  private createPortal(step: UiTourStep) {
    return new ComponentPortal(
      UiTourDialogComponent,
      this.viewContainerRef,
      this.createInjector(step)
    );
  }

  private createOverlay(step: UiTourStep): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.getOverlayPositin(step),
    });
  }

  private getOverlayPositin(step: UiTourStep) {
    return this.overlay.position().flexibleConnectedTo(step.el,
    ).withPositions([
      { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 10 },
      { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 10 },
      { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -10 },
      { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -10 },
    ])
  }
}
