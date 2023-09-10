import { ControlBaseType } from './ControlBaseType';

export class TextAreaControl extends ControlBaseType<string> {
  override controlType: string = 'Textarea';
}
