import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IPerson } from '../../data/models/person.model';
import { FullnamePipe } from '../../../../shared/pipes/fullname-pipe';
import { DatePipe } from '@angular/common';
import { AgePipe } from '../../../../shared/pipes/age-pipe';

@Component({
  selector: 'app-person-list',
  imports: [AgePipe,FullnamePipe,DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './person-list.html',
  styleUrl: './person-list.css',
})
export class PersonList {
  @Input() data: IPerson[] = [];
  @Output() view = new EventEmitter<IPerson>();
}
