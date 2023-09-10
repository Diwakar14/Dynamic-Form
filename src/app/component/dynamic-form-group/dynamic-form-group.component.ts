import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ControlBaseType, DropdownOptions } from './models/ControlBaseType';
import { FormDataService, IControlChange } from './form-data.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { toFormGroup } from './dynamic-form';

@Component({
  selector: 'app-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent implements OnInit, OnDestroy {
  @Input() fControl!: ControlBaseType<string>;
  @Input() form!: FormGroup;

  @Output() controlChange = new EventEmitter();

  /**
   * Subscriptio Contaier
   */
  subContainer$ = new Subscription();

  /**
   * Loading boolean
   */
  loading: boolean = false;

  get isValid() {
    let control = this.form.controls[this.fControl.key];
    return control.invalid && (control.touched || control.dirty);
  }

  get checkBoxControl() {
    return this.form.get(this.fControl.key) as FormArray;
  }

  constructor(
    private readonly dataStoreService: FormDataService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.fControl.emitEvent) {
      this.emitChanges();
    }

    if (this.fControl.getOptionDataFromStore) {
      this.getOptionDataFromStore();
    }

    if (this.fControl.allowUpdate) {
      this.updateFormControl();
    }
  }

  updateFormControl() {
    const control$ = this.dataStoreService.controlState.subscribe({
      next: (value: ControlBaseType<string>) => {
        if (this.fControl.key === value.key) {
          this.fControl = value; // Update Control Object

          if (this.fControl.value != value.value)
            this.form.get(this.fControl.key)?.setValue(value.value);

          if (this.fControl.disable)
            this.form.get(this.fControl.key)?.disable();
        }
      },
    });

    this.subContainer$.add(control$);
  }

  getOptionDataFromStore() {
    // this.form.get(this.fControl.key)?.disable();
    const storeSub$ = this.dataStoreService.getDropdownData.subscribe({
      next: (value: Map<string, Array<DropdownOptions>>) => {
        let data = value.get(this.fControl.key);
        if (data) {
          this.fControl.options = data;
          // this.form.get(this.fControl.key)?.disable();
        }
      },
    });

    this.subContainer$.add(storeSub$);
  }

  /**
   * Emit Event for other to listen
   */
  emitChanges() {
    let control = this.form.get(this.fControl.key);
    const controlSubs$ = control?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: any) => {
          let change: IControlChange = {
            key: this.fControl.key,
            value: value,
          };
          this.dataStoreService.setControlChange(change);
        },
      });

    this.subContainer$.add(controlSubs$);
  }

  ngOnDestroy(): void {
    this.subContainer$.unsubscribe();
  }
}
