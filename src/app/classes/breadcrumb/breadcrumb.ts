export class Breadcrumb {
  private readonly _data: {
    label: string;
    route: string;
  }[]

  constructor(data: {
    label: string;
    route: string;
  }[]) {
    this._data = data;
  }

  get data(): {
    label: string;
    route: string;
  }[] {
    return this._data;
  }

  static create(data: {
    label: string;
    route: string;
  }[]): Breadcrumb {
    return new this(data);
  }
}
