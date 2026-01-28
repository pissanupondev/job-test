import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreatePerson, IPerson } from '../../data/models/person.model';
import { DialogMode } from '../../data/models/person-dialog.types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgePipe } from '../../../../shared/pipes/age-pipe';
import { DatePipe } from '@angular/common';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

@Component({
  selector: 'app-person-dialog',
  imports: [
    ReactiveFormsModule,
    AgePipe,
    DatePipe,
    DatePicker
  ],
  templateUrl: './person-dialog.html',
  styleUrl: './person-dialog.css',
})
export class PersonDialog {
  @Input({ required: true }) mode!: DialogMode;
  @Input() person?: IPerson;
  
  @Output() save = new EventEmitter<CreatePerson>();
  @Output() close = new EventEmitter<void>();

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (this.mode === 'view' && this.person) {
      this.form.patchValue(this.person);
      this.form.disable();
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.value as CreatePerson);
  }

  get f() {
    return this.form.controls;
  }

  birthDateChanged() {
  }
}
