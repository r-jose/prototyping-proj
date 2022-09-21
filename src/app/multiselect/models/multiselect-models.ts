export interface DropdownItem {
  id: number | string;
  text: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  hierarchies?: DropdownItem[];
  paths?: string[];
  isParent?: boolean;
  isExpanded?: boolean;
  isMappingValid?: boolean;
  parentId?: string;
}

export interface MultiDropdownConfiguration {
  singleSelection?: boolean;
  showMinimumItem?: number;
  placeholder?: string;
  selectAllText?: string;
  deselectAllText?: string;
  enableFilter?: boolean;
  enableTreeView?: boolean;
  filterPlaceholder?: string;
  noDataText?: string;
}
