import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { toFormGroup } from './component/dynamic-form-group/dynamic-form';
import {
  ControlBaseType,
  DropdownOptions,
} from './component/dynamic-form-group/models/ControlBaseType';
import { DropdownControl } from './component/dynamic-form-group/models/DropdownControl';
import { CountryService } from './services/country.service';
import {
  FormDataService,
  IControlChange,
} from './component/dynamic-form-group/form-data.service';
import { Subscription, map } from 'rxjs';
import { CheckboxControl } from './component/dynamic-form-group/models/CheckboxControl';
import { InputControl } from './component/dynamic-form-group/models/InputControl';
import { RadioControl } from './component/dynamic-form-group/models/RadioControl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dynamic-form';
  controls: ControlBaseType<string>[] = [
    new InputControl({
      key: 'name',
      label: 'Name',
      order: 1,
      required: true,
    }),
    new InputControl({
      key: 'phone',
      label: 'Phone',
      order: 1,
      required: true,
      allowUpdate: true,
    }),
    new RadioControl({
      key: 'gender',
      label: 'Gender',
      order: 1,
      required: true,
      options: [
        { key: 'male', value: 'Male' },
        { key: 'female', value: 'Female' },
        { key: 'other', value: 'Others' },
      ],
    }),
    new CheckboxControl({
      key: 'interest',
      label: 'Interests',
      order: 1,
      required: false,
      emitEvent: true,
      options: [
        { key: 'video-game', value: 'Video Game' },
        { key: 'drawing', value: 'Drawing' },
        { key: 'other-interest', value: 'Others' },
      ],
    }),
    new DropdownControl({
      key: 'country',
      label: 'Country',
      order: 1,
      required: false,
      emitEvent: true,
      getOptionDataFromStore: true,
    }),
    new DropdownControl({
      key: 'translation',
      label: 'Translation',
      order: 2,
      required: false,
      emitEvent: true,
      getOptionDataFromStore: true,
    }),

    new DropdownControl({
      key: 'nativeName',
      label: 'Native Name',
      order: 2,
      required: false,
      depKey: 'country',
    }),
    new CheckboxControl({
      key: 'agree',
      label: '',
      order: 1,
      required: false,
      options: [{ key: 'agree', value: 'Agree to accept the licence' }],
    }),
  ];
  form!: FormGroup;

  subContainer$: Subscription = new Subscription();

  constructor(
    private countryService: CountryService,
    private dataStoreService: FormDataService
  ) {}

  ngOnInit(): void {
    this.form = toFormGroup(this.controls);
    this.handleControlChange();
    this.getDataFromService('country');
  }

  handleControlChange() {
    const listen$ = this.dataStoreService.controlChanges$.subscribe({
      next: (value: Map<string, string>) => {
        let val = value.get('country');
        if (val) {
          this.getTranslation('translation', val);
        }
        console.log(value);
      },
    });
    this.subContainer$.add(listen$);
  }

  getTranslation(key: string, country: string) {
    const transSub$ = this.countryService
      .getTranslation(country)
      .pipe(
        map((item: any) =>
          item.map((i: any) => ({
            key: i.capital[0],
            value: i.capital[0],
          }))
        )
      )
      .subscribe({
        next: (value: DropdownOptions[]) => {
          this.dataStoreService.setDropdownData(key, value);

          let control = this.controls.find(
            (i) => i.key === 'phone'
          ) as ControlBaseType<string>;
          this.dataStoreService.updateControl({
            ...control,
            value: '6206311964',
            label: 'Phone Number',
          });
        },
      });

    this.subContainer$.add(transSub$);
  }

  getDataFromService(key: string) {
    const apiSub$ = this.countryService
      .getCountry()
      .pipe(
        map((item: any) =>
          item.map((i: any) => ({ key: i.name.common, value: i.name.common }))
        )
      )
      .subscribe({
        next: (value: DropdownOptions[]) => {
          this.dataStoreService.setDropdownData(key, value);
        },
        error(err: any) {
          console.log(err);
        },
      });
    this.subContainer$.add(apiSub$);
  }

  submit() {
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.subContainer$.unsubscribe();
  }
}
