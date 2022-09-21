import { Component, OnInit } from '@angular/core';
import { Layout } from '../../models/layout.enum';
type ComponentType = typeof Layout2Component;
@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.less']
})
export class Layout2Component implements OnInit {
  public static readonly id = Layout.FixedLayout2;
  public static readonly componentType: ComponentType;
  constructor() { }

  ngOnInit(): void {
  }

}
