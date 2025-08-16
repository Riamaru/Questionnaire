import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListTableComponent } from '../list-table/list-table.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { QuestionListService } from '../@services/question-list.service';
import { QuestionService } from '../@services/question.service';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { HttpClientService } from '../@services/http-client.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../@services/user.service';

@Component({
  selector: 'app-question-list',
  imports: [
    ListTableComponent,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    SlideShowComponent,
    CommonModule
  ],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {
  constructor(
    private questionListService: QuestionListService,
    private questionService: QuestionService,
    private httpClientService: HttpClientService,
    private userService: UserService
  ) { }
  welcome!: boolean;
  isOverlayVisible!: boolean;


  SURVICE_ELEMENT_DATA!: any
  ELEMENT_DATA!: any
  userModeArray: Array<any> = []
  startDate!: any
  endDate!: any
  searchInput = ""

  jsonData!: any
  @ViewChild('sDate') sDateAuto!: ElementRef
  @ViewChild('eDate') eDateAuto!: ElementRef

  ngOnInit(): void {
    this.welcome = this.userService.welcome;
    this.isOverlayVisible = this.userService.isOverlayVisible;

    let getApi = {
      quizName: null,
      startDate: null,
      endDate: null,
      forFrontEnd: true
    }
    this.httpClientService.postApi('/quiz/getAll', getApi)
      .subscribe((data: any) => {


        this.jsonData = data;

        this.insertQuizListToService()
        this.insertQuestionsToService()

        this.updateServiceQuestionList()
        // this.updateQuestionArrayID()


        for (let check of this.SURVICE_ELEMENT_DATA) {
          if (check.statusCode != 'unpublished') {
            this.userModeArray.push(check)
          }
        }

        this.ELEMENT_DATA = this.userModeArray
        this.openLoading()
      })


  }
  filterQuestions() {
    let filtered = this.userModeArray;

    // 名稱過濾
    if (this.searchInput && this.searchInput.trim() !== '') {
      filtered = filtered.filter(q => q.name.includes(this.searchInput.trim()));
    }

    // 日期過濾
    if (this.startDate && this.endDate) {
      filtered = filtered.filter(q => q.eDate >= this.startDate && q.eDate <= this.endDate);
    }

    this.ELEMENT_DATA = filtered;
  }

  changeInput() {
    this.filterQuestions();
    // let searchArray = []
    // for (let search of this.userModeArray) {
    //   if (search.name.indexOf(this.searchInput) != -1) {
    //     searchArray.push(search)
    //   }
    // }
    // this.ELEMENT_DATA = searchArray

  }

  dateSearch() {
    this.filterQuestions();
    // let searchArray = []
    // if (this.endDate) {
    //   for (let search of this.userModeArray) {
    //     if (search.eDate >= this.startDate && search.eDate <= this.endDate) {
    //       searchArray.push(search)
    //     }
    //   }
    //   this.ELEMENT_DATA = searchArray
    // }
  }

  clear() {
    this.searchInput = ""
    this.startDate = null
    this.endDate = null
    this.filterQuestions();
    // this.ELEMENT_DATA = this.userModeArray
  }

  insertQuizListToService() {
    this.questionListService.ELEMENT_DATA = []
    for (let item of this.jsonData.quizList) {
      this.questionListService.ELEMENT_DATA.push(
        {
          ID: item.id,
          name: item.title,
          statusCode: "",
          status: "",
          sDate: item.startDate,
          eDate: item.endDate,
          go: "",
          published: item.published
        }
      )
    }
    this.SURVICE_ELEMENT_DATA = this.questionListService.ELEMENT_DATA
    this.userModeArray = []
  }

  insertQuestionsToService() {
    this.questionService.questListArray = []

    for (let item of this.jsonData.quizList) {


      let questionArray: Array<any> = []

      this.httpClientService.postApi('/quiz/getByQuizId?quizId=' + item.id, item.id)
        .subscribe((data: any) => {


          for (let questionList of data.questionList) {
            let optionsArray: Array<any> = []
            if (questionList.type != "Text") {
              for (let index = 0; index < questionList.options.length; index++) {

                optionsArray.push({
                  optionName: questionList.options[index],
                  questionID: index + 1
                })
              }
            }

            questionArray.push({
              ID: questionList.quesId,
              questName: questionList.question,
              required: questionList.required,
              questionType: questionList.type,
              options: optionsArray
            })

          }
          this.questionService.questListArray.push({
            ID: item.id,
            title: item.title,
            directions: item.description,
            sDate: item.startDate,
            eDate: item.endDate,
            questionArray: questionArray
          })


        })

    }
    console.log(this.questionService.questListArray);


  }


  updateServiceQuestionList() {
    for (let status of this.SURVICE_ELEMENT_DATA) {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      let startDateFormat = new Date(status.sDate)
      let endDateFormat = new Date(status.eDate)

      startDateFormat.setHours(0, 0, 0, 0);
      endDateFormat.setHours(0, 0, 0, 0);

      if (startDateFormat <= today && endDateFormat >= today) {
        status.status = '進行中'
        status.statusCode = 'progress'
        status.go = '前往'
      } else if (endDateFormat < today) {
        status.status = '已結束'
        status.statusCode = 'ended'
        status.go = '前往'
      } else if (startDateFormat > today) {
        status.status = '尚未開始'
        status.statusCode = 'notStartedYet'
        status.go = '前往'
      } else if (!status.published) {
        status.status = '未發布'
        status.statusCode = 'unpublished'
        status.go = '編輯'
      }
    }
  }

  // updateQuestionArrayID() {

  //   for (let all of this.questionService.questListArray) {
  //     let ID = 1
  //     for (let questionArray of all.questionArray) {
  //       questionArray.ID = ID
  //       let optionID = 1
  //       for (let options of questionArray.options) {
  //         options.questionID = optionID
  //         optionID += 1
  //       }
  //       ID += 1
  //     }
  //   }

  // }

  toSDate() {
    let startDate = this.sDateAuto.nativeElement as HTMLInputElement
    startDate.focus()

    if (startDate.showPicker) {
      startDate.showPicker()
    }
  }

  toEDate() {
    let endDate = this.eDateAuto.nativeElement as HTMLInputElement
    endDate.focus()

    if (endDate.showPicker) {
      endDate.showPicker()
    }
  }

  openLoading() {

    setTimeout(() => {
      this.isOverlayVisible = false
      this.userService.isOverlayVisible = false;
      this.closeLoading()
    }, 2000);
  }

  closeLoading() {
    setTimeout(() => {
      this.welcome = false
      this.userService.welcome = false
    }, 2000)
  }

}
