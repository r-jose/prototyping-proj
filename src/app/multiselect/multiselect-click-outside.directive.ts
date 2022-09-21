import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class MultiselectClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output('onClickOutside') onClickOutside: EventEmitter<any> =
    new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(
    targetElement: any
  ) {
    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.onClickOutside.emit();
    }
  }
}
