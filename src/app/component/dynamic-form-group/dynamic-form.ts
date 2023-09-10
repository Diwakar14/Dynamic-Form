import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBaseType } from './models/ControlBaseType';

export const toFormGroup = (formGroups: ControlBaseType<string>[]) => {
  const group: any = {};

  formGroups.forEach((control) => {
    if (control.controlType === 'Checkbox') {
      let fcontrol: any = [];
      if (control.options.length > 0) {
        control.options.forEach((o: any) =>
          fcontrol.push(
            new FormGroup({
              value: new FormControl(o.value),
              key: new FormControl(o.key),
              checked: new FormControl(false),
            })
          )
        );
        group[control.key] = new FormArray(fcontrol);
      }
    } else {
      group[control.key] = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
    }
  });

  console.log(group);
  return new FormGroup(group);
};
