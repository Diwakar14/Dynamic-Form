import { FormControlBase } from '../../dynamic-form-group/models/ControlBaseType';
import { FormGroup } from '@angular/forms';
import { toFormGroup } from '../../dynamic-form-group/dynamic-form';

export class WizScreen {
  key: string = '';
  title: string = '';
  subtitle: string = '';
  active: boolean = false;
  formControls: Array<FormControlBase<string>> = [];
  form: FormGroup = new FormGroup('');

  constructor(options: {
    key: string;
    title: string;
    subtitle?: string;
    active: boolean;
    formControls: Array<FormControlBase<string>>;
  }) {
    this.key = options.key;
    this.title = options.title;
    this.subtitle = options.subtitle || '';
    this.active = options.active;
    this.formControls = options.formControls;
    this.form = toFormGroup(this.formControls);
  }
}
