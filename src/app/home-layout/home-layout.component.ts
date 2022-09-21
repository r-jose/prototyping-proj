import { Layout1Component } from './layouts/fixed/layout1/layout1.component';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { LayoutProviderService } from './layouts/services/layout.service';
import { Layout } from './layouts/models/layout.enum';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.less']
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {
  selectedPortal!: Portal<any>;
  layout = Layout;
  constructor(private layoutProviderService: LayoutProviderService) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    const layoutFactory = this.layoutProviderService.getLayout(Layout.FixedLayout1);
    this.selectedPortal = new ComponentPortal(layoutFactory.componentType);
  }
  selectedLayout!: Layout;
  onChange() {
    const layoutFactory = this.layoutProviderService.getLayout(this.selectedLayout);
    this.selectedPortal = new ComponentPortal(layoutFactory.componentType);
  }

}
