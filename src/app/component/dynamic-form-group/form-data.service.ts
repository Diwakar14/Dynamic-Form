import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControlBaseType, DropdownOptions } from './models/ControlBaseType';

export interface IControlChange {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private changeMap = new Map<string, string>();
  private dropdownDataMap = new Map<string, Array<DropdownOptions>>();

  private controlChange = new BehaviorSubject<Map<string, string>>(
    this.changeMap
  );

  private dropdownChange = new BehaviorSubject<
    Map<string, Array<DropdownOptions>>
  >(this.dropdownDataMap);

  private updateControlChange = new BehaviorSubject<ControlBaseType<string>>(
    new ControlBaseType()
  );

  constructor() {}

  get controlChanges$() {
    return this.controlChange;
  }

  setDropdownData(propKey: string, data: DropdownOptions[]) {
    this.dropdownDataMap.set(propKey, data);
    this.dropdownChange.next(this.dropdownDataMap);
  }

  get getDropdownData() {
    return this.dropdownChange;
  }

  setControlChange(change: IControlChange) {
    this.changeMap.set(change.key, change.value);
    this.controlChange.next(this.changeMap);
  }

  getControlChange(key: string) {
    return this.controlChange.value.get(key);
  }

  get controlState() {
    return this.updateControlChange;
  }
  updateControl(control: ControlBaseType<string>) {
    this.updateControlChange.next(control);
  }
}
