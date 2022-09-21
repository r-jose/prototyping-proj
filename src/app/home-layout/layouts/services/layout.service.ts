import { ComponentFactory, ComponentFactoryResolver, Injectable } from "@angular/core";
import { Layout1Component, Layout2Component } from "../index";
import { Layout } from "../models/layout.enum";

@Injectable({
  providedIn: 'root'
})
export class LayoutProviderService {
  constructor(private resolver: ComponentFactoryResolver) {
  }

  public getLayout(layoutId: Layout): ComponentFactory<unknown> {
    if (layoutId === Layout.FixedLayout1) return this.resolver.resolveComponentFactory(Layout1Component);
    if (layoutId === Layout.FixedLayout2) return this.resolver.resolveComponentFactory(Layout2Component);
    return this.resolver.resolveComponentFactory(Layout1Component);
  }
}

