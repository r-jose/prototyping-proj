import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectClickOutsideDirective } from './multiselect-click-outside.directive';
import { MultiselectComponent } from './multiselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MultiselectComponent, MultiselectClickOutsideDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MultiselectComponent, MultiselectClickOutsideDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultiselectModule {}
