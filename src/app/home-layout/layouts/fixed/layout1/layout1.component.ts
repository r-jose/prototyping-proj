import { Layout } from './../../models/layout.enum';
import { Component, OnInit } from '@angular/core';
type ComponentType = typeof Layout1Component;
@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.less']
})
export class Layout1Component implements OnInit {
  public static readonly id = Layout.FixedLayout1;
  public static readonly componentType: ComponentType;
  constructor() { }

  ngOnInit(): void {

  }

}
