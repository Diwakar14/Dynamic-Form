import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WizScreen } from '../../models/WizScreen';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent {
  @Input()
  screen!: WizScreen;

  @Output()
  onNext = new EventEmitter();

  @Output()
  onBack = new EventEmitter();

  submit() {
    let form = this.screen.form;
    console.log(form.value);

    if (form.valid) this.next();
  }

  next() {
    this.onNext.emit();
  }

  back() {
    this.onBack.emit();
  }
}
