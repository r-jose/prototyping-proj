import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
export interface DropdownMenuItem{
  id: string;
  title: string;
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.less']
})
export class MenuItemComponent implements OnInit {
  @ViewChild("menu", {static: true}) menu!: MatMenu;
  @Input() items: DropdownMenuItem[] = [];

  @Output() onItemClicked = new EventEmitter<DropdownMenuItem>(undefined);

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item:DropdownMenuItem){
    this.onItemClicked.emit(item);
  }

}
