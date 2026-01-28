import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {

   transform(birthDate: string | Date | null | undefined): number {
    if (!birthDate) return 0;

    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();

    return currentYear - birthYear;
  }

}
