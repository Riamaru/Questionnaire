import { Router } from '@angular/router';
import { Component, Input, output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UserService } from '../../@services/user.service';
import { QuestionListService } from '../../@services/question-list.service';
import { QuestionService } from '../../@services/question.service';
import { HttpClientService } from '../../@services/http-client.service';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-feedback',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private questionListService: QuestionListService,
    private questionService: QuestionService,
    private httpClientService: HttpClientService
  ) { }

  title!: String
  sqlData: Array<any> = []
  question!: any
  newQuestionArray: Array<any> = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'date', 'go'];
  dataSource = new MatTableDataSource<any>(this.sqlData);

  ngOnInit(): void {

    this.httpClientService.postApi("/quiz/feedback?quizId=" + this.questionListService.questionID, {})
      .subscribe((res: any) => {

        ELEMENT_DATA = []
        this.title = res.title;
        let count = 0
        for (let item of res.feedbackVoList) {


          ELEMENT_DATA.push({
            id: count += 1,
            name: item.userName,
            date: item.fillinDate,
            go: "前往",
            phone: item.phone,
            userEmail: item.email,
            userAge: item.age,
            fillinDate: item.fillinDate,
            answerVoList: item.answerVoList
          })

        }
        ELEMENT_DATA.sort((a, b) => {
          if (a.date > b.date) return -1;
          else if (a.date > b.date) return 1;
          return 0;
        });

        this.sqlData = ELEMENT_DATA
        this.dataSource.data = this.sqlData


      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }

  viewUserAnswer(element: any) {


    let index = this.questionService.questListArray.findIndex(index => index.ID == this.questionListService.questionID)
    this.question = this.questionService.questListArray[index]


    this.addAnswerField()

    let answerVoList: Array<any> = element.answerVoList


    for (let item of answerVoList) {
      for (let newQuestionArrayItem of this.newQuestionArray) {
        if (item.quesId == newQuestionArrayItem.ID) {
          if (newQuestionArrayItem.questionType == "Text") {
            newQuestionArrayItem.textAnswer = item.answerList[0]
          } else if (newQuestionArrayItem.questionType == "Multi") {
            for (let i = 0; i <= item.answerList.length; i++) {
              for (let newQuestionArrayItemOptions of newQuestionArrayItem.options) {
                if (item.answerList[i] == newQuestionArrayItemOptions.optionName) {
                  newQuestionArrayItemOptions.selectedAnswerBool = true
                }
              }
            }
          } else if (newQuestionArrayItem.questionType == "Single") {
            for (let newQuestionArrayItemOptions of newQuestionArrayItem.options) {
              if (item.answerList[0] == newQuestionArrayItemOptions.optionName) {
                newQuestionArrayItem.radioAnswer = newQuestionArrayItemOptions.questionID
              }
            }
          }
        }
      }
    }



    this.questionService.questionData = {
      ID: this.question.ID,
      title: this.question.title,
      directions: this.question.directions,
      sDate: this.question.sDate,
      eDate: this.question.eDate,
      userName: element.name,
      userPhone: element.phone,
      userEmail: element.userEmail,
      userAge: element.userAge,
      questionArray: this.newQuestionArray,
      fillinDate: element.fillinDate

    }
    this.userService.feedbackMode = true


    this.router.navigateByUrl('/QuestionContent')
  }

  addAnswerField() {
    for (let array of this.question.questionArray) {
      this.newQuestionArray.push({ ...array, textAnswer: '', radioAnswer: '' })
    }
    for (let newArray of this.newQuestionArray) {
      let options = [];
      for (let option of newArray.options) {
        options.push({ ...option, selectedAnswerBool: false })
      }
      newArray.options = options
    }
  }

  goBack() {
    this.router.navigateByUrl('/AdminQuestionList')
  }


  viewResult() {
    this.router.navigateByUrl('/QuestionResult')
  }

}

// export interface PeriodicElement {
//   id: number;
//   name: string;
//   date: string;
//   go: string;
// }

let ELEMENT_DATA = [

];
