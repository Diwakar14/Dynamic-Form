export class ServiceConfig {
  service: any;
  body: any;
}

export interface DropdownOptions {
  key: string;
  value: string;
}

// There are two ways to load data, static data using options property and
// other way is to use API to get the data for
export class ControlBaseType<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  disable: boolean;
  options: DropdownOptions[];

  emitEvent: boolean; // Emit changes to the control to global store
  listenEvent: boolean; // Listen to changes from different controls
  depKey: string; // Key on which the value of this control depends

  getDataFromService: boolean; // Get data from api
  serviceConfig: ServiceConfig; // Config for calling the API

  getOptionDataFromStore: boolean;
  allowUpdate: boolean;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      disable?: boolean;
      options?: DropdownOptions[];

      emitEvent?: boolean;
      listenEvent?: boolean;
      depKey?: string;

      getDataFromService?: boolean;
      getOptionDataFromStore?: boolean;
      allowUpdate?: boolean;
      serviceConfig?: ServiceConfig;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || 'Input';
    this.type = options.type || '';
    this.disable = options.disable || false;
    this.options = options.options || [];

    this.emitEvent = options.emitEvent || false;
    this.listenEvent = options.listenEvent || false;
    this.depKey = options.depKey || '';

    this.getDataFromService = options.getDataFromService || false;
    this.getOptionDataFromStore = options.getOptionDataFromStore || false;
    this.allowUpdate = options.allowUpdate || false;
    this.serviceConfig = options.serviceConfig || new ServiceConfig();
  }
}
