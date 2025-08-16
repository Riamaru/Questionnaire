import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {

  questionID = 0



  ELEMENT_DATA: PeriodicElement[] = [
    // { ID: 1, name: '現代人購物習慣調查', statusCode: '', status: '', sDate: '2025-03-10', eDate: '2025-04-30', go: '' },
    // { ID: 7, name: '現代人結婚意願問券', statusCode: '', status: '', sDate: '2024-03-21', eDate: '2025-06-21', go: '' },
    // { ID: 6, name: '熱炒店愛好投票', statusCode: '', status: '', sDate: '2025-01-01', eDate: '2025-03-01', go: '' },
    // { ID: 2, name: '手搖飲愛好調查', statusCode: '', status: '', sDate: '2025-03-20', eDate: '2025-06-20', go: '' },
    // { ID: 3, name: '運動問卷', statusCode: '', status: '', sDate: '2025-03-09', eDate: '2025-06-20', go: '' },
    // { ID: 4, name: '電玩遊戲調查', statusCode: '', status: '', sDate: '2025-03-01', eDate: '2025-05-03', go: '' },
    // { ID: 5, name: '休閒娛樂調查', statusCode: '', status: '', sDate: '2025-06-07', eDate: '2025-08-07', go: '' },
  ];

}
export interface PeriodicElement {
  ID: number;
  name: string;
  statusCode: string;
  status: string;
  sDate: string;
  eDate: string;
  go: string;
  published: boolean
}
