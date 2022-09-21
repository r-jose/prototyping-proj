import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';
import { CanvasActions } from '../image-map.component';
import { DoppioLinkTargetDescription, ImageMapModel } from './image-map-model';

declare const fabric: any;
export class ImageCanvas {
  private canvas!: any;
  model!: ImageMapModel;
  canvasAction$ = new BehaviorSubject<CanvasActions>(CanvasActions.Rectangle);

  canvasZoom$ = new BehaviorSubject<number>(1);

  imageScaleStyle$ = new BehaviorSubject<string>('');
  canvasContainerScaleStyle$ = new BehaviorSubject<string>('');
  constructor(public canvasElementId: string, private detector: ChangeDetectorRef, private canvasAction: CanvasActions, private canvasImage: ElementRef) {
    this.model = new ImageMapModel();
    this.canvas = new fabric.Canvas(canvasElementId);
    this.canvas.getPointer;
    fabric.Object.prototype.transparentCorners = false;

    this.setCanvasSize();

    this.setZoom();

    this.enableCanvasObjectProperties();

    this.onMouseDown();

    this.onMouseMove();

    this.onMouseUp();

    this.onShapeCreated();

    this.onShapeSelected();

    this.setCanvasImage();

    this.canvasAction$.next(this.canvasAction);
  }

  setCanvasImage() {
    // set image by url
    var imageUrl = "https://baconmockup.com/640/360";
    this.canvas.setBackgroundImage(imageUrl, this.canvas.renderAll.bind(this.canvas), {
      // Optionally add an opacity lvl to the image

      // should the image be resized to fit the container?
      backgroundImageStretch: true
    });
    //set image base64
    // var base32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAKkklEQVR4nO3dMW4cRxqGYfWaoZOFADnYRMAm4gGcSKkV2KDCPcFeYQGHS0eG4TPsBTY1YQZySiV7AAqOlDiQAMGJU6E3tERB9WO+YrF6Zp4nE1rT3TND80Vp5nct67qu9wBgR3+ZfQMA7CcBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQORk9g3AUMsy9vy20+GIWYEAEBEQACICAkBEQACICAgAEQEBICIgAESWdfVFdo7X8l37+HpujgQ+xQoEgIiAABAREAAiAgJAREAAiAgIABEBASBiPxAO2tK5H0jvFIgxKw6ZFQgAEQEBICIgAEQEBICIgAAQERAAIgICQMQcCFNdvHg59PzlHMYvxYYghde//9E8Xj2/s8ePuq4/+vWr9N4/+80KBICIgAAQERAAIgICQERAAIgICAARAQEgsqw2LGCiy2K/jndX10Ov/+Vv/+l6/P/+9s/m8bMnp83jl8X5q+d/+vBB8/j1qzfN48+K+6v49XHcrEAAiAgIABEBASAiIABEBASAiIAAEBEQACLmQJiqmgOpVHMS1RxG5aLz/NWcR6/q+X/W+fy/KY779XHcrEAAiAgIABEBASAiIABEBASAiIAAEBEQACIns2+A/VbNcXzdef7q8ZfFnMPr//6refyLv37ePF7NUVRzHr3Pvzp/75xHdX8/d52dQ2cFAkBEQACICAgAEQEBICIgAEQEBICIgAAQMQfCVL1zEr1e//5H8/jXz8/bJ3haHC+MniPpvr79PmiwAgEgIiAARAQEgIiAABAREAAiAgJAREAAiCzr6ovefFq130evcr+PzsdXLq6um8dPHz5oHr9+9aZ5/Gzj+4mU5/frgQYrEAAiAgJAREAAiAgIABEBASAiIABEBASAiDkQmi5evOx6/GfFHESl2o9i9JzKu8FzIr2vT8WcByNZgQAQERAAIgICQERAAIgICAARAQEgIiAARE5m3wD7rZyDKOYozh4/6rp+NSdyr5gTqfbLePa8fX8/PW3PyVSvz9+L61eq+zfnwUhWIABEBASAiIAAEBEQACICAkBEQACICAgAEXMgdPn86vvm8bN//HhHd5Kp9sv4+bw9R/LNvfacRfX4X4vrV8o5GBjICgSAiIAAEBEQACICAkBEQACICAgAEQEBILKsqy+SH7Vfvpt7/a/+PfT0S7EfSGV9fn47N/IJy9O+8/vPl5msQACICAgAEQEBICIgAEQEBICIgAAQERAAIuZA2LTLzjmOXtV+Ict5334g1fkvi+P2A2EmKxAAIgICQERAAIgICAARAQEgIiAARAQEgIg5EIba+hxHpZrzWIs5j0o159HLnAgjWYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgdBn8pxHZfScxWi9cyz2E2EkKxAAIgICQERAAIgICAARAQEgIiAARAQEgIg5EPoUcyDlHELn5Wfvp1Htd1I9v977NyfCTFYgAEQEBICIgAAQERAAIgICQERAAIgICAARcyA0VXMOld45hV6z5xx650Rmm/36sW1WIABEBASAiIAAEBEQACICAkBEQACICAgAkZPZN8BcFy9etv/C1XXfBZ6cNg/37hey9TmFre8n8q73/eWoWYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgdB0+vBB8/j1qzfN471zCveKOYqt76dR6Z5T6dyvpVK9/9Uc0dnjR7d5O2yMFQgAEQEBICIgAEQEBICIgAAQERAAIgICQGRZ18kbJjBU9T393jmPZ8V+H368tq3cD6bQ+/NjTmS/WYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgey52XMeFT9e27YU+4n8dHXddX5zIofNCgSAiIAAEBEQACICAkBEQACICAgAEQEBIHIy+wYYy5wHLdX71zsnUv38sd+sQACICAgAEQEBICIgAEQEBICIgAAQERAAIuZADpw5D3qMnhNhv1mBABAREAAiAgJAREAAiAgIABEBASAiIABEzIFs3MWLl83j5jyYyZzIcbMCASAiIABEBASAiIAAEBEQACICAkBEQACImAOZrJrzOH34oOv85jyYqZrzqH6+qzkSP99zWYEAEBEQACICAkBEQACICAgAEQEBICIgAETMgQxWfY999vV9j56Rzh4/ah6v5qDYNisQACICAkBEQACICAgAEQEBICIgAEQEBIDIshoEACYZPSfl19tYViAARAQEgIiAABAREAAiAgJAREAAiAgIABH7gQDTmNPYb1YgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQOZl9A9ytZVlm38JRW9e1eXzf35/q+XFYrEAAiAgIABEBASDiM5Aj9/btk6Hnv3//auj1t37+6vGV3vPPfjyHzQoEgIiAABAREAAiPgOBO7Tvcx7wPisQACICAkBEQACI+AzkyG19DmDfzz/79YORrEAAiAgIABEBASDiM5AjM3o/ikPf7wL4kxUIABEBASAiIABEltUmxrzn5mcU67fF3//hwz/v+hlIdf7KzevfNPv8s++v0nv/H53Pr5OjYgUCQERAAIgICAARcyBwQGbP+XBcrEAAiAgIABEBASBiDoQPfDSnUf39G3/eeQ5kx/Pv6tjOP/r19+uC91mBABAREAAiAgJAxBwI3CH7pXBIrEAAiAgIABEBASDiMxA2bWtzFsCfrEAAiAgIABEBASAiIABEBASAiIAAEBEQACLmQGgaPQfh/Id9fg6bFQgAEQEBICIgAETsiQ5AxAoEgIiAABAREAAiAgJAREAAiAgIABEBASDi/4XVaVn2+/8mVI0BjX5+s6/PWL1jZrN//mizAgEgIiAARAQEgIjPQG7Z27dPhp7//v2rrutXj6/0Pr/R1x/9+mz9/d36+Xtt/f6OjRUIABEBASAiIABEfAZy5MxZMJKfr8NmBQJAREAAiAgIABGfgdyxrX8PffQcyb6bPYdTmX3+2XM63C0rEAAiAgJAREAAiPgMZOMOfb+Mrd//6Nf/0N9fDpsVCAARAQEgIiAARJbVpsBdbv4b9fpt5/l++PDPu/4beXX9m+e/afTjK6PPv+v1R7/+t33+yuz3r7K195c2KxAAIgICQERAAIgICAARAQEgIiAARAQEgIg5kE4ffU+/+vs7nn/nOYFbvv5H99P5+NHXr86/6+NHv/779v7e9ut722779afNCgSAiIAAEBEQACL2A5ls9r/Bzt6PYvb1gZwVCAARAQEgIiAARHwGwk565wAYa/YcRq/Zc0bsxgoEgIiAABAREAAiPgOhyZwG+2z2nNWhswIBICIgAEQEBICIz0Bu2exPBA79+r3n3/r97fv5Zz+eu2UFAkBEQACICAgAEXuiAxCxAgEgIiAARAQEgIiAABAREAAiAgJAREAAiAgIABEBASAiIABEBASAiIAAEBEQACICAkBEQACICAgAEQEBICIgAEQEBICIgAAQERAAIgICQERAAIgICAARAQEgIiAARAQEgMj/ARYVSURm9DRHAAAAAElFTkSuQmCC";
    // var img = new Image();
    // img.src =base32;
    // var f_img = new fabric.Image(img);
    // this.canvas.setBackgroundImage(f_img);
    // this.canvas.renderAll();

  }

  setCanvasSize() {
    this.canvas.setHeight(this.canvasImage.nativeElement.clientHeight);
    this.canvas.setWidth(this.canvasImage.nativeElement.clientWidth);
  }

  private onMouseDown() {
    this.canvas.on('mouse:down', (options: any) => {
      this.model.isDrawing = true;
      var pointer = this.canvas.getPointer(options.e);
      if (options.target) {
        console.log('an object was clicked! ', options.target.type);
      }
      switch (this.canvasAction$.value) {
        case CanvasActions.Rectangle:
          this.model.currentRect = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            stroke: '#045193',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            fill: '',
            guid: Guid.create(),
          });
          break;

        case CanvasActions.Circle:
          this.model.currentCirc = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 1,
            stroke: '#045193',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            fill: '',
            guid: Guid.create(),
          });
          this.canvas.add(this.model.currentCirc);
          break;

        case CanvasActions.Polygon:
          var restart = false;
          if (options.target && this.model.pointArray[0] && options.target.id == this.model.pointArray[0].id) {
            this.GeneratePolygon();
            restart = true;
          }
          if (this.model.polygonMode) {
            this.addPoint(options);
          }
          // on next click draw another polygon
          if (restart) {
            this.model.polygonMode = true;
            this.CreatePolygon();
          }
          break;
        default:
          break;
      }

      this.detector.detectChanges();
    });
  }

  private onMouseMove() {
    this.canvas.on('mouse:move', (options: any) => {
      var pointer = this.canvas.getPointer(options.e);
      if (!this.model.isDrawing && (this.canvasAction$.value == CanvasActions.Rectangle || this.canvasAction$.value == CanvasActions.Circle)) return;

      switch (this.canvasAction$.value) {
        case CanvasActions.Rectangle:
          this.model.currentRect?.set({
            width: Math.abs(pointer.x - this.model.currentRect.left),
            height: Math.abs(pointer.y - this.model.currentRect.top),
          });
          break;
        case CanvasActions.Circle:
          this.model.currentCirc.set({
            radius: Math.abs(pointer.x - this.model.currentCirc.left),
          });
          break;
        case CanvasActions.Polygon:
          if (this.model.activeLine && this.model.activeLine.class == 'line') {
            this.model.activeLine.set({ x2: pointer.x, y2: pointer.y });

            var points = this.model.activeShape.get('points');
            points[this.model.pointArray.length] = {
              x: pointer.x,
              y: pointer.y,
            };
            this.model.activeShape.set({
              points: points,
            });
          }
          break;
        default:
          break;
      }

      this.canvas?.renderAll();
      this.detector.detectChanges();
    });
  }

  private onMouseUp() {
    this.canvas.on('mouse:up', (options: any) => {
      this.model.isDrawing = false;
      var pointer = this.canvas.getPointer(options.e);
      switch (this.canvasAction$.value) {
        case CanvasActions.Rectangle:
          var w = Math.abs(pointer.x - this.model.currentRect.left);
          var h = Math.abs(pointer.y - this.model.currentRect.top);
          if (w == 0 || h == 0) {
            this.canvas.remove(this.model.currentRect);
          } else {
            this.model.currentRect.setCoords();
            var coords = this.GetImageMapCoordsForShape(this.model.currentRect, CanvasActions.Rectangle);

            var rectangleShape = 0;
            var newArea = {
              id: `${this.model.areas.length}`,
              shape: rectangleShape,
              coords: coords,
              guid: this.model.currentRect.guid,
              label: '',
              link: new DoppioLinkTargetDescription(),
              aid: `${this.model.areas.length}`,
            };

            this.model.areas.push(newArea);
            // this.$scope.shapeAdded({ item: newArea });
            this.canvas.add(this.model.currentRect);
          }
          break;

        case CanvasActions.Circle:
          var w = Math.abs(pointer.x - this.model.currentCirc.left);
          var h = Math.abs(pointer.y - this.model.currentCirc.top);
          if (w == 0 || h == 0) {
            console.log('Removing circle');
            this.canvas.remove(this.model.currentCirc);
          } else {
            this.model.currentCirc.setCoords();
            var coords = this.GetImageMapCoordsForShape(this.model.currentCirc, CanvasActions.Circle);
            var circArea = {
              id: `${this.model.areas.length}`,
              shape: 1,
              coords: coords,
              guid: this.model.currentCirc.guid,
              label: '',
              link: new DoppioLinkTargetDescription(),
              aid: `${this.model.areas.length}`,
            };

            this.model.areas.push(circArea);
            // this.$scope.shapeAdded({ item: circArea });
          }
          break;
        default:
          break;
      }
      this.detector.detectChanges();
    });
  }

  private onShapeCreated() {
    this.canvas.on('selection:created', (options: any) => {
      // this event also fires when user selects multiple objects
      // we are only interested in selecting and handling selection of a single object
      // inside timeout for change detection to take place correctly
      this.handleShapeSelected(options);
    });
  }

  private onShapeSelected() {
    this.canvas.on('selection:updated', (options: any) => {
      // this event fires when we select another shape without clearing the selection
      // i.e. click shape one then click shape two
      this.handleShapeSelected(options);
    });
  }

  private GeneratePolygon() {
    var points = new Array();
    this.model.pointArray.forEach((point) => {
      points.push({
        x: point.left,
        y: point.top,
      });
      this.canvas.remove(point);
    });

    this.model.lineArray.forEach((line) => {
      this.canvas.remove(line);
    });

    this.canvas.remove(this.model.activeShape).remove(this.model.activeLine);
    var polygonGuid = Guid.create().toString();
    var polygon = new fabric.Polygon(points, {
      stroke: '#045193',
      fill: '',
      opacity: 1,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      guid: polygonGuid,
    });
    this.canvas.add(polygon);

    var coords = this.GetImageMapCoordsForShape(polygon, CanvasActions.Polygon);

    var polygonArea = {
      id: `${this.model.areas.length}`,
      shape: 2,
      coords: coords,
      guid: polygonGuid,
      label: '',
      link: new DoppioLinkTargetDescription(),
      aid: `${this.model.areas.length}`,
    };

    this.model.areas.push(polygonArea);
    // this.$scope.shapeAdded({ item: polygonArea });

    this.model.activeLine = null;
    this.model.activeShape = null;
    this.model.polygonMode = false;
  }

  private addPoint(options: any) {
    var random = Math.floor(Math.random() * (this.model.max - this.model.min + 1)) + this.model.min;
    var id = new Date().getTime() + random;
    var circle = new fabric.Circle({
      radius: 5,
      fill: '#ffffff',
      stroke: '#333333',
      strokeWidth: 0.5,
      left: options.e.layerX / this.canvas.getZoom(),
      top: options.e.layerY / this.canvas.getZoom(),
      selectable: false,
      hasBorders: false,
      hasControls: false,
      originX: 'center',
      originY: 'center',
      id: id,
    });
    if (this.model.pointArray.length == 0) {
      circle.set({
        fill: 'red',
      });
    }
    var points = [
      options.e.layerX / this.canvas.getZoom(),
      options.e.layerY / this.canvas.getZoom(),
      options.e.layerX / this.canvas.getZoom(),
      options.e.layerY / this.canvas.getZoom(),
    ];
    var line = new fabric.Line(points, {
      strokeWidth: 2,
      fill: '#999999',
      stroke: '#999999',
      class: 'line',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
    });
    if (this.model.activeShape) {
      var pos = this.canvas.getPointer(options.e);

      var shapePoints = this.model.activeShape.get('points');
      shapePoints.push({
        x: pos.x,
        y: pos.y,
      });

      var polygon = new fabric.Polygon(shapePoints, {
        stroke: '#333333',
        strokeWidth: 1,
        fill: '#cccccc',
        opacity: 0.1,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
      });
      this.canvas.remove(this.model.activeShape);
      this.canvas.add(polygon);
      this.model.activeShape = polygon;
      this.canvas.renderAll();
    } else {
      var polyPoint = [
        {
          x: options.e.layerX / this.canvas.getZoom(),
          y: options.e.layerY / this.canvas.getZoom(),
        },
      ];
      var polygon = new fabric.Polygon(polyPoint, {
        stroke: '#333333',
        strokeWidth: 1,
        fill: '#cccccc',
        opacity: 0.1,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
      });
      this.model.activeShape = polygon;
      this.canvas.add(polygon);
    }
    this.model.activeLine = line;

    this.model.pointArray.push(circle);
    this.model.lineArray.push(line);

    this.canvas.add(line);
    this.canvas.add(circle);
    this.canvas.selection = false;
  }

  private CreatePolygon() {
    this.model.polygonMode = true;
    this.model.pointArray = [];
    this.model.lineArray = [];
    this.model.activeLine = {};
  }

  private handleShapeSelected(options: any) {
    if (
      options.target &&
      this.canvasAction$.value === CanvasActions.Select &&
      options.target.guid &&
      options.selected &&
      options.selected.length === 1
    ) {
      // var id = options.target.guid;
      // this.$scope.shapeSelected({ id: id });
      this.model.selectedObjectGuid = options.target.guid;
    } else {
      this.model.selectedObjectGuid = '';
    }
  }

  private enableCanvasObjectProperties() {
    this.canvasAction$.subscribe((action) => {
      var enabled = action === CanvasActions.Select;
      this.canvas.forEachObject((obj: any) => {
        if (obj) {
          obj.selectable = enabled;
          obj.hasBorders = enabled;
          obj.hasControls = enabled;
          obj.hasRotatingPoint = enabled;
          obj.borderDashArray = [5];
          obj.lockRotation = obj.get('type') === 'polygon' ?? !enabled;
          // // do not allow rotating point for rect and circle since it messes up the coordinates on the canvas
          obj.evented = enabled; // events will not propagate to this object if val is false
        }
      });

      if (enabled) this.canvas.discardActiveObject();
      if (action === CanvasActions.Polygon) this.CreatePolygon();
      this.canvas.renderAll();
    });
  }

  private GetImageMapCoordsForShape(fabricShape: any, canvasAction: CanvasActions) {
    var result: any[] = [];
    switch (canvasAction) {
      case CanvasActions.Rectangle:
        var coords = fabricShape.getCoords(true, false);
        // coords=> array of corner points
        // imageMap coords => [a,b,c,d]
        // a=> top x,
        // b=> top y
        // c=> bottom x,
        // d=> bottom y
        result = [coords[0].x, coords[0].y, coords[2].x, coords[2].y];
        break;
      case CanvasActions.Circle:
        var radius = fabricShape.getRadiusX();
        var centerPoint = fabricShape.getCenterPoint();
        result = [centerPoint.x, centerPoint.y, radius];
        break;
      case CanvasActions.Polygon:
        var matrix = fabricShape.calcTransformMatrix();
        var transformedPoints = fabricShape
          .get('points')
          .map((p: { x: number; y: number }) => {
            return new fabric.Point(
              p.x - fabricShape.pathOffset.x,
              p.y - fabricShape.pathOffset.y
            );
          })
          .map((p: any) => {
            return fabric.util.transformPoint(p, matrix);
          });

        transformedPoints.forEach((point: { x: any; y: any }) => {
          result.push(point.x);
          result.push(point.y);
        });
        break;
      default:
        break;
    }

    return result.join(',');
  }

  private setZoom() {
    this.canvasZoom$.subscribe((factor) => {
      this.canvas.setZoom(factor);
      this.model.zoom = `${100 * factor}%`;
      this.model.zoomStyle = {
        'transform-origin': 'top left',
        transform: `scale(${factor})`,
      };
      const width = this.canvasImage.nativeElement.clientWidth * factor;
      const height = this.canvasImage.nativeElement.clientHeight * factor;
      this.model.containerStyle = {
        width: `${width}px`,
        height: `${height}px`,
      };

      this.imageScaleStyle$.next(this.model.zoomStyle);
      this.canvasContainerScaleStyle$.next(this.model.containerStyle);
      this.canvas.setHeight(height);
      this.canvas.setWidth(width);
    });
  }

  delete() {
    var activeObject = this.canvas.getActiveObjects();
    var ids = activeObject.map((x: any) => x.guid);

    this.canvas.discardActiveObject();
    this.canvas.remove(...activeObject);
    this.canvasAction$.next(CanvasActions.Select);
    // this.$scope.shapeDeleted({ ids: ids });
  }
}
