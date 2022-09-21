export class ImageMapModel{
  imageUrl!: string;
  areas: Area[]=[];
  isViewMaximized!: boolean;
  canvas: any;
  zoom: string = '100%';
  zoomStyle: any;
  containerStyle: any;
  selectedObjectGuid!: string;
  // drawingMode!: string;
  isDrawing!: boolean;
  currentRect: any;
  currentCirc: any;
  eventAdded!: boolean;

  // polygon
  // polygon
  pointArray: any[]=[];
  activeLine: any;
  activeShape: any;
  lineArray: any[]=[];
  polygonMode!: boolean;
  max: number = 999999;
  min: number = 99;
}

interface Area {
  id: string;     // anchor id, including map name
  aid: string;    // anchor id
  label: string;
  shape: AreaShape;
  link: DoppioLinkTargetDescription;
  coords: string;
  guid: string;
}

export class DoppioLinkTargetDescription {
  public IsExisting: boolean = false;
  public Target!: string;
  // public TargetTopic: TopicBase;
  public Use!: string;
  public View!: string;
  public Title!: string;

  public static Create(data: any): DoppioLinkTargetDescription {
      var result = new DoppioLinkTargetDescription();
      result.IsExisting = data.IsExisting;
      result.Use = data.Use;
      result.View = data.View;
      result.Target = data.Target;
      return result;
  }
}

enum AreaShape {
  rect = 0,
  circle = 1,
  poly = 2,
  bezier1 = 3
}
