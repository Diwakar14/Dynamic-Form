import { FormControlBase } from './ControlBaseType';

export class DropdownControl extends FormControlBase<string> {
  override controlType: string = 'Dropdown';
}
