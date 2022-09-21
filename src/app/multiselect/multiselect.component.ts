import { CommonService } from './../common.service';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MultiDropdownConfiguration,
  DropdownItem,
} from './models/multiselect-models';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { AppService } from '../services/app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectComponent implements OnChanges {
  constructor(private toastr: ToastrService,private appService: AppService){
  }

  isMobile = false;

  @Input('configuration') configuration: MultiDropdownConfiguration = {
    showMinimumItem: 5,
  };
  @Input('datasource') datasource: DropdownItem[] = [];
  @Input('isDataProcessing') isDataProcessing: boolean = false;
  @Input('disabled') disabled: boolean = false;
  @Output('onSelectedItems') onSelectedItems = new EventEmitter<
    DropdownItem[]
  >();
  @Output('onSelectedItem') onSelectedItem = new EventEmitter<DropdownItem>();
  @Input('selectedItems') selectedItems: DropdownItem[] = [];
  isOpen = true;
  showHierarchy = false;
  isSelectedAll = false;
  filterControl = new FormControl('');
  datasource$ = this.filterControl.valueChanges.pipe(
    distinctUntilChanged(),
    startWith(this.datasource),
    debounceTime(400),
    map(() => {
      return this.datasource.filter((f) => {
        const key = (this.filterControl.value as string).toLowerCase();
        const matched = f.text.toLowerCase().includes(key);
        const pathIndexes = f.paths?.map((val, index) => {
          return {
            node: val,
            index: index,
          };
        });

        const keyMatched = pathIndexes?.find((p) =>
          p.node.toLowerCase().includes(key)
        );

        const currentNodeMatched = pathIndexes?.find(
          (p) => p.node.toLowerCase() == f.text.toLowerCase()
        );

        if (keyMatched && currentNodeMatched) {
          return (
            keyMatched.index < currentNodeMatched?.index ||
            keyMatched.index == currentNodeMatched?.index
          );
        }
        return matched;
      });
    })
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (!changes.selectedItems) {
        this.selectedItems = [...this.datasource.filter((f) => f.isSelected)];
      }
      this.isSelectedAll = this.datasource.length == this.selectedItems.length;
    }
  }

  open() {
    this.toastr.success('asdasd world!', 'Toastr fun!');
    this.isOpen = !this.isOpen;
  }

  get hasSelected() {
    const data = this.datasource;
    return this.selectedItems.length == 0 ||
      (this.selectedItems.length < data.length &&
        this.selectedItems.length !== data.length)
      ? this.config.selectAllText
      : this.config.deselectAllText;
  }

  get config() {
    return this.configuration;
  }

  get items() {
    const min = this.config?.showMinimumItem as number;
    return this.selectedItems.slice(0, min);
  }

  get more() {
    const data = this.datasource.filter((f) => f.isSelected);
    const min = this.config?.showMinimumItem as number;
    const count = data.length - min;
    return count < 0 ? 0 : count;
  }

  get hasFilter() {
    return this.filterControl.value !== '';
  }

  onItemSelect(item: DropdownItem, isMultipleSelection?: boolean) {
    let source = this.datasource.find((f) => f.id == item.id);
    if (source) {
      source.isSelected = !source.isSelected;

      this.selectedItems = [
        ...this.selectedItems.filter((f) => f.id !== item.id),
      ];

      if (item.isSelected || isMultipleSelection) {
        this.selectedItems.push({ ...source, isSelected: true });
      } else {
        this.isSelectedAll = false;
        this.onSelectedItems.emit(this.selectedItems);
      }

      if (item.isSelected && !isMultipleSelection) {
        this.isSelectedAll =
          this.selectedItems.length == this.datasource.length;
        this.onSelectedItems.emit(this.selectedItems);
      }
      this.onSelectedItem.emit(source);
    }
  }

  removeItem(item: DropdownItem, isMultipleSelection?: boolean) {
    let index = this.selectedItems.findIndex((f) => f.id == item.id);
    this.selectedItems.splice(index, 1);
    let source = this.datasource.find((f) => f.id == item.id);
    if (source) {
      source.isSelected = false;
      this.isSelectedAll = false;
      if (!isMultipleSelection) {
        this.onSelectedItems.emit(this.selectedItems);
        this.onSelectedItem.emit(source);
      }
    }
  }

  selectAll() {
    const data = this.datasource;
    if (data.length == this.selectedItems.length) {
      data
        .filter((f) => !f.isDisabled)
        .forEach((f) => this.removeItem(f, true));
    } else {
      data
        .filter((f) => !f.isSelected)
        .forEach((f) => this.onItemSelect(f, true));
    }
    this.onSelectedItems.emit(this.selectedItems);
  }

  showOrHideHierarchy(item: DropdownItem) {
    item.isExpanded = !item.isExpanded;
  }
}
