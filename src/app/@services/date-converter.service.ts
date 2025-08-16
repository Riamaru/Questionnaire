import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {
  constructor() { }
  changeDateFormat(dateData: Date, dateType: string = '-') {
    let year;
    let month;
    let date;
    if (dateData) {
      year = dateData.getFullYear();
      month = dateData.getMonth() + 1;
      if (String(month).length == 1) {
        month = '0' + month;
      }
      date = dateData.getDate();
      if (String(date).length == 1) {
        date = '0' + date;
      }

      return year + dateType + month + dateType + date;
    } else {
      return '';
    }
  }
}
