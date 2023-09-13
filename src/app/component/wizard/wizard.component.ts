import { Component, OnInit } from '@angular/core';
import { InputControl } from '../dynamic-form-group/models/InputControl';
import { RadioControl } from '../dynamic-form-group/models/RadioControl';
import { DropdownControl } from '../dynamic-form-group/models/DropdownControl';
import { WizScreen } from './models/WizScreen';
import { Wizard } from './models/Wizard';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  activeIndex: number = 0;
  wizard: Wizard = {
    data: null,
    screens: [
      new WizScreen({
        key: 'exam',
        title: 'Exam',
        subtitle: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus distinctio
      tempora voluptas aliquam commodi adipisci, fuga ex dolores error non eum
      quo similique deserunt sed inventore, molestias corrupti dicta quibusdam.`,
        active: false,
        formControls: [
          new RadioControl({
            key: 'numberOfPaper',

            label:
              'Select the number of test papers you want to appear for in GATE 2024',
            options: [
              { key: 'one', value: 'One' },
              { key: 'two', value: 'Two' },
            ],
          }),
          new DropdownControl({
            key: 'paper',
            label: 'Select GATE 2024 Paper 1 (Primary)',
          }),
          new DropdownControl({ key: 'city1', label: 'City 1' }),
          new DropdownControl({ key: 'city2', label: 'City 2' }),
          new DropdownControl({ key: 'city3', label: 'City 3' }),
        ],
      }),
      new WizScreen({
        key: 'personal',
        title: 'Personal',
        subtitle: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus distinctio
      tempora voluptas aliquam commodi adipisci, fuga ex dolores error non eum
      quo similique deserunt sed inventore, molestias corrupti dicta quibusdam.`,
        active: false,
        formControls: [
          new InputControl({
            key: 'name',
            placeholder: 'Enter your name',
            label: 'Name',
          }),
          new InputControl({ key: 'email', label: 'Email' }),
          new InputControl({ key: 'phone', label: 'Phone' }),
          new InputControl({ key: 'dob', label: 'Date of Birth' }),
          new RadioControl({
            key: 'gender',
            label: 'Gender',
            options: [
              { key: 'male', value: 'Male' },
              { key: 'female', value: 'Female' },
              { key: 'other', value: 'Other' },
            ],
          }),
        ],
      }),
      new WizScreen({
        key: 'address',
        title: 'Address',
        subtitle: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus distinctio
      tempora voluptas aliquam commodi adipisci.`,
        active: false,
        formControls: [
          new InputControl({ key: 'pincode', label: 'Pincode' }),
          new DropdownControl({ key: 'country', label: 'Country' }),
          new DropdownControl({ key: 'state', label: 'State' }),
          new InputControl({ key: 'add1', label: 'Address Line 1' }),
          new InputControl({ key: 'add2', label: 'Address Line 2' }),
          new InputControl({ key: 'add3', label: 'Address Line 3' }),
          new InputControl({ key: 'city', label: 'City/Town' }),
        ],
      }),
    ],
  };

  ngOnInit(): void {
    this.wizard.screens[this.activeIndex].active = true;
  }

  submit(index: number) {
    let form = this.wizard.screens[index].form;
    console.log(form.value);

    if (form.valid) this.next(index + 1);
  }

  next(index: number) {
    if (index < this.wizard.screens.length) {
      this.wizard.screens.forEach((item) => (item.active = false));
      this.wizard.screens[index].active = true;
    }
  }

  back(index: number) {
    if (index > 0) {
      this.wizard.screens.forEach((item) => (item.active = false));
      this.wizard.screens[index - 1].active = true;
    }
  }
}
