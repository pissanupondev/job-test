import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {

  transform(p: { firstName: string; lastName: string }) {
    return `${p.firstName} ${p.lastName}`;
  }

}
