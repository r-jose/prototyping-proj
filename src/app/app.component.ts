import { ImageCanvas } from './image-map/image-map-canvas/image-map-canvas';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClassificationHierarchyMapper } from './multiselect/models/classification-mapper';
import {
  DropdownHierarchyDataMapper,
  IDropdownHierarchyDataMapper,
} from './multiselect/models/dropdown-hierarchy-data.mapper';
import {
  DropdownItem,
  MultiDropdownConfiguration,
} from './multiselect/models/multiselect-models';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
// declare const fabric: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  datasource: DropdownItem[] = [];
  dropdownSettings: MultiDropdownConfiguration = {
    showMinimumItem: 3,
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
  };

  @ViewChild('containerCanvas') containerCanvas!: ElementRef;
  constructor(private http: HttpClient, private detector: ChangeDetectorRef) {
    this.datasource = this.hierarchyMapper(
      new ClassificationHierarchyMapper(response)
    );
  }


  ngOnInit(): void {

  }

  hierarchyMapper(mapper: IDropdownHierarchyDataMapper) {
    return new DropdownHierarchyDataMapper(mapper).data.map();
  }

  title = 'reusable-components';

  onSelectedItem(items: DropdownItem) {
    console.log(items);
  }
}

export const response: DropdownItem[] = [
  {
    id: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
    text: 'Environmental Issues',
    isDisabled: true,
    paths: [],
    parentId: '',
    isSelected: true,
  },
  {
    id: 'a9c2e226-2b1e-4bfd-b81a-dd6ef7fab506',
    text: 'Node 2',
    paths: [],
    parentId: '',
  },
  {
    id: 'fabd7fa1-372a-4d24-b324-b2c93d00f850',
    text: 'Climate',
    paths: ['Environmental Issues', 'Climate'],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: '7c7b6620-b6f5-4814-adeb-842c080e4bbe',
    text: 'Climate Change',
    paths: ['Environmental Issues', 'Climate Change'],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: '2ba3f45c-a24d-4e11-b048-a0c150322dd1',
    text: 'Hot',
    paths: ['Environmental Issues', 'Climate Change', 'Hot'],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: '3a4bf0d8-ec38-4939-abab-d35fb669d0ca',
    text: 'Very Hot',
    paths: ['Environmental Issues', 'Climate Change', 'Very Hot'],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },

  {
    id: '5a010daa-de4c-4fcf-9db8-8b5f4356d5c2',
    text: 'Very Very Hot',
    paths: ['Environmental Issues', 'Climate Change', 'Very Very Hot'],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: '3a4bf0d8-ec38-4939-abab-d35fb669d0c2',
    text: 'Flaming Hot',
    paths: [
      'Environmental Issues',
      'Climate Change',
      'Very Very Hot',
      'Flaming Hot',
    ],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: '36a1bf86-8e74-4218-b0eb-9a5d25783f44',
    text: 'Common Programmming Challenges (Dot Net, Angular, Javascript, Typescript)',
    isDisabled: false,
    paths: [
      'Environmental Issues',
      'Common Programmming Challenges (Dot Net, Angular, Javascript, Typescript)',
    ],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
    isSelected: true,
  },
  {
    id: '6dd2cdf8-b165-4227-929e-3e9e00b19160',
    text: 'Programming Paradigm',
    paths: [
      'Environmental Issues',
      'Common Programmming Challenges (Dot Net, Angular, Javascript, Typescript)',
      'Programming Paradigm',
    ],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: '0c268c6c-776a-4ac0-8b89-15c812292bd7',
    text: 'Design Patterns',
    paths: [
      'Environmental Issues',
      'Common Programmming Challenges (Dot Net, Angular, Javascript, Typescript)',
      'Programming Paradigm',
      'Design Patterns',
    ],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: 'a0c8fef9-40d5-43ec-87a2-fdbfce392a12',
    text: 'Deforestation',
    paths: ['Environmental Issues', 'Deforestation'],
    parentId: '1f42820a-ea83-4c89-a3e7-e5d2d8a9c7b6',
  },
  {
    id: 'c816986c-2eda-4bdc-8380-d120def99470',
    text: 'N2C1',
    isDisabled: false,
    paths: ['Node 2', 'N2C1'],
    parentId: 'a9c2e226-2b1e-4bfd-b81a-dd6ef7fab506',
    isSelected: true,
  },
];
