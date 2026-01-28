import {
  Component,
  ElementRef,
  ViewChild,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePicker),
    multi: true
  }],
  templateUrl: './date-picker.html'
})
export class DatePicker
  implements ControlValueAccessor {

  @Input() placeholder = 'DD/MM/YYYY';

  @ViewChild('realDate')
  realDate!: ElementRef<HTMLInputElement>;

  value: string | null = null;
  touched = false;
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  get displayValue(): string {
    return this.value
      ? formatDate(this.value, 'dd/MM/yyyy', 'en-GB')
      : '';
  }

  openPicker() {
    if (this.disabled) return;

    const input = this.realDate.nativeElement;
    input.showPicker ? input.showPicker() : input.click();
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  dateChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
