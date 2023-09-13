import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControlBase, DropdownOptions } from './models/ControlBaseType';

export class ControlChange {
  key: string = '';
  value: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private changeMap = new ControlChange();
  private dropdownDataMap = new Map<string, Array<DropdownOptions>>();

  private controlChange = new BehaviorSubject<ControlChange>(this.changeMap);

  private dropdownChange = new BehaviorSubject<
    Map<string, Array<DropdownOptions>>
  >(this.dropdownDataMap);

  private updateControlChange = new BehaviorSubject<FormControlBase<string>>(
    new FormControlBase()
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

  setControlChange(change: ControlChange) {
    this.controlChange.next(change);
  }

  getControlChange(key: string) {
    return this.controlChange.value;
  }

  get controlState() {
    return this.updateControlChange;
  }
  updateControl(control: FormControlBase<string>) {
    this.updateControlChange.next(control);
  }
}
