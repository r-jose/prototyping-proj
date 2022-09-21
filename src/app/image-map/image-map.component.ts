import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { of } from 'rxjs';
import { StepType } from '../ui-tour/steps';
import { ImageCanvas } from './image-map-canvas/image-map-canvas';

@Component({
  selector: 'app-image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.less']
})
export class ImageMapComponent implements OnInit, AfterViewInit {

  constructor(private detector: ChangeDetectorRef) { }
  rectangleInstruction = "When rectangle is selected: Move the mouse to the top-left corner of your desired rectangle and hold the left mouse button to start drawing a rectangle. or: Drag the mouse and release the mouse button to finish your rectangle";
  circleInstruction = "When circle is selected: Whatever works for circles in the same style as the rectangle";
  polygonInstruction = "When polygon is selected: Click anywhere on the image to start drawing your polygon then… Click anywhere on the image to add a node to your polygon. Click the red starting point to finish the polygon.";
  selectInstruction = "When select is selected: this will allow you to select an object in the canvas, which will enable you to resize, move or delete an object.";
  deleteInstruction = "When delete is clicked: this will remove the selected object in the canvas.";
  zoomInstruction = "Allows you to to zoom-in or zoom-out the canvas";
  canvasInstruction = "This is your work-area in which you can free draw a rectangle, circle or polygon";
  canvasActions = CanvasActions;
  canvasAction: CanvasActions = CanvasActions.Rectangle;
  public canvas!: ImageCanvas;
  zoomValue: number = 1;

  imageScaleStyle$ = of({});
  canvasContainerScaleStyle$ = of({});
  @ViewChild('canvasImage') canvasImage !: ElementRef;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.canvas = new ImageCanvas('canvas', this.detector, this.canvasAction, this.canvasImage);
      this.imageScaleStyle$ = this.canvas.imageScaleStyle$;
      this.canvasContainerScaleStyle$ = this.canvas.canvasContainerScaleStyle$;
      this.canvas.canvasAction$.subscribe(action => this.canvasAction = action);
    }, 500);
  }

  ngOnInit(): void {
  }

  onActionChanged(canvasAction: CanvasActions) {
    this.canvasAction = canvasAction;
    this.canvas.canvasAction$.next(canvasAction);
  }

  onZoomChanged() {
    this.canvas.canvasZoom$.next(this.zoomValue);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth;
    // this.canvas.setCanvasSize();
  }

  browseTopics(){}

}

export enum CanvasActions {
  Rectangle = 'rectangle',
  Circle = 'circle',
  Polygon = 'polygon',
  Select = 'select',
  Delete = 'delete'
}
