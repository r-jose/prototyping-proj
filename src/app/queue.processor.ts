export interface Status<T> {
  id: string;
  source: T;
  inProgress: boolean;
  completed: boolean;
}
export class QueueProcessor<T>{
  constructor() {
  }

  private status!: { [serviceId: string]: Status<T> };

  public register(serviceId: string) {
    this.status[serviceId]
  }

}

