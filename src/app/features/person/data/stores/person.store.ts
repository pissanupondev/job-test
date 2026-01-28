import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { CreatePerson, IPerson } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonStore {
 private api = inject(ApiService);

  constructor() {
    this.load();
  }

  persons = signal<IPerson[]>([]);
  selectedPerson = signal<IPerson | undefined>(undefined);
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);
  
  load() {
    this.loading.set(true);
    
    this.api.get<IPerson[]>('persons').subscribe({
      next: res => this.persons.set(res),
      error: err => this.error.set(err.message),
      complete: () => this.loading.set(false)
    });
  }

  create(payload: CreatePerson) {
    this.saving.set(true);
    this.error.set(null);

    this.api.post<IPerson>('persons', payload).subscribe({
      next: res => {
        this.persons.update(list => [...list, res]);
      },
      error: err => this.error.set(err.message),
      complete: () => this.saving.set(false)
    });
  }

  selectById(id: number) {
    const found = this.persons().find(p => p.id === id);

    if (found) {
      this.selectedPerson.set(found);
      return;
    }
    
    this.loading.set(true);

    this.api.get<IPerson>(`persons/${id}`).subscribe({
      next: res => this.selectedPerson.set(res),
      error: err => this.error.set(err.message),
      complete: () => this.loading.set(false)
    });
  }
}
