import { ControlBaseType } from './ControlBaseType';

export class InputControl extends ControlBaseType<string> {
  override controlType: string = 'Input';
}
