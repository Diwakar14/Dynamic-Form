import { FormControlBase } from './ControlBaseType';

export class TextAreaControl extends FormControlBase<string> {
  override controlType: string = 'Textarea';
}
