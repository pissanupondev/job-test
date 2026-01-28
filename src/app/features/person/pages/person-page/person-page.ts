import { Component, inject, signal } from '@angular/core';
import { PersonStore } from '../../data/stores/person.store';
import { CommonModule } from '@angular/common';
import { CreatePerson, IPerson } from '../../data/models/person.model';
import { DialogMode } from '../../data/models/person-dialog.types';
import { PersonList } from '../../components/person-list/person-list';
import { PersonDialog } from '../../components/person-dialog/person-dialog';

@Component({
  selector: 'app-person-page',
  imports: [
    CommonModule,
    PersonList,
    PersonDialog
  ],
  templateUrl: './person-page.html',
  styleUrl: './person-page.css',
})
export class PersonPage {
  dialogOpen = signal(false);
  dialogMode = signal<DialogMode>('add');

  constructor(public store: PersonStore) {
  }

  openAdd() {
    this.dialogMode.set('add');
    this.dialogOpen.set(true);
  }

  openView(id: number) {
    this.store.selectById(id);
    this.dialogMode.set('view');
    this.dialogOpen.set(true);
  }

  save(p: CreatePerson) {
    this.store.create(p);
    this.close();
  }

  close() {
    this.dialogOpen.set(false);
  }

  
}
