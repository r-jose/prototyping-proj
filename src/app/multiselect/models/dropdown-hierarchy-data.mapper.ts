import { DropdownItem } from './multiselect-models';

export interface IDropdownHierarchyDataMapper {
  /**
   * @returns formatted data structure that includes the children of the dropdown item parent
   */
  map: () => DropdownItem[];
}

export class DropdownHierarchyDataMapper {
  data: IDropdownHierarchyDataMapper;
  constructor(_mapper: IDropdownHierarchyDataMapper) {
    this.data = _mapper;
  }
}
