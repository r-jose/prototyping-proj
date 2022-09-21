import { Component, OnInit } from '@angular/core';
import { DropdownMenuItem } from './menu-item/menu-item.component';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.less']
})
export class DropdownMenuComponent implements OnInit {

  constructor() { }
  public items : DropdownMenuItem[] = [{id:'123', title:'Title 1'}, {id:'124', title:'Title 2'}];

  ngOnInit(): void {
  }

  onItemClick(item: DropdownMenuItem){
    console.log(item);
  }

}
