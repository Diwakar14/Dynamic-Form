import { ControlBaseType } from './ControlBaseType';

export class RadioControl extends ControlBaseType<string> {
  override controlType: string = 'Radio';
}
