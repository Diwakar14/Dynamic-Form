import { FormControlBase } from './ControlBaseType';

export class RadioControl extends FormControlBase<string> {
  override controlType: string = 'Radio';
}
