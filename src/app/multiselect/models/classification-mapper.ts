import { IDropdownHierarchyDataMapper } from './dropdown-hierarchy-data.mapper';
import { DropdownItem } from './multiselect-models';

export class ClassificationHierarchyMapper
  implements IDropdownHierarchyDataMapper
{
  /**
   * @param data flat structure of DropdownItem Array
   */
  constructor(private data: DropdownItem[]) {}

  private datasource: DropdownItem[] = [];

  private getPathIndexes(paths?: string[]) {
    return paths?.map((val, index) => {
      return {
        node: val,
        index: index,
      };
    });
  }

  private getChildren(
    rootParentId: string,
    parent: string,
    hierarchies?: DropdownItem[]
  ) {
    let hierarchyGroup = hierarchies?.map((item) => {
      const hierarchy = { ...item, isMappingValid: false };
      const nodeIndexes = this.getPathIndexes(hierarchy.paths);
      const parentNode = nodeIndexes?.find((p) => p.node == parent);
      const childNode = nodeIndexes?.find((p) => p.node == hierarchy.text);

      if (!parentNode && !childNode) {
        return hierarchy;
      }

      if ((childNode?.index as number) - (parentNode?.index as number) == 1) {
        const children = hierarchies.filter(
          (i) =>
            i.paths?.includes(parent) &&
            i.paths?.includes(hierarchy.text) &&
            i.parentId == rootParentId
        );

        hierarchy.hierarchies = this.getChildren(
          rootParentId,
          hierarchy.text,
          children.filter((c) => c.text !== hierarchy.text)
        );
        hierarchy.isMappingValid = true;
      }

      return hierarchy;
    });

    return hierarchyGroup?.filter((f) => f.isMappingValid);
  }

  map() {
    const parentItems = this.data.filter((f) => f.paths?.length == 0);
    const parentDropdownItems = parentItems.map((item) => {
      const children = this.getChildren(
        item.id.toString(),
        item.text,
        this.data.filter((f) => f.paths?.length !== 0)
      );

      let dropdownItem: DropdownItem = {
        ...item,
        hierarchies: children,
      };
      return dropdownItem;
    });

    this.datasource = this.data.map((item) => {
      const children = parentDropdownItems.filter(
        (f) => item.text == f.text || item.parentId == f.id
      );
      return {
        ...item,
        hierarchies: children,
      };
    });

    return this.datasource;
  }
}
