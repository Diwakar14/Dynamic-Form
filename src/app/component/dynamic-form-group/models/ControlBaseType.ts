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
export class FormControlBase<T> {
  value: T | undefined;
  key: string;
  label: string;

  placeholder: string;
  labelWidth: string;
  controlWidth: string;

  required: boolean;
  order: number;
  controlType: string;
  type: string;
  disable: boolean;
  options: DropdownOptions[];
  vertical: boolean;

  emitEvent: boolean; // Emit changes to the control to global store
  getOptionDataFromStore: boolean;
  allowUpdate: boolean;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;

      labelWidth?: string;
      controlWidth?: string;
      placeholder?: string;

      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      disable?: boolean;
      options?: DropdownOptions[];
      vertical?: boolean;

      emitEvent?: boolean;
      getOptionDataFromStore?: boolean;
      allowUpdate?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';

    this.placeholder = options.placeholder || '';
    this.labelWidth = options.labelWidth || 'col-md-3';
    this.controlWidth = options.controlWidth || 'col-md-9';

    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || 'Input';
    this.type = options.type || '';
    this.disable = options.disable || false;
    this.options = options.options || [];
    this.vertical = options.vertical || false;

    this.emitEvent = options.emitEvent || false;
    this.getOptionDataFromStore = options.getOptionDataFromStore || false;
    this.allowUpdate = options.allowUpdate || false;
  }
}
