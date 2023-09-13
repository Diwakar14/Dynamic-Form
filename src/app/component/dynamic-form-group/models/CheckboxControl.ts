import { FormControlBase } from './ControlBaseType';

export class CheckboxControl extends FormControlBase<string> {
  override controlType: string = 'Checkbox';
}
