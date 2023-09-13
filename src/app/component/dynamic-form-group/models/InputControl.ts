import { FormControlBase } from './ControlBaseType';

export class InputControl extends FormControlBase<string> {
  override controlType: string = 'Input';
}
