import { Router } from '@angular/router';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ListTableComponent } from '../../list-table/list-table.component';
import { UserService } from '../../@services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { QuestionListService } from '../../@services/question-list.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from '../../@services/question.service';
import { HttpClientService } from '../../@services/http-client.service';
import { DeleteSuccessDialogComponent } from './delete-success-dialog/delete-success-dialog.component';

@Component({
  selector: 'app-admin-question-list',
  imports: [
    ListTableComponent,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './admin-question-list.component.html',
  styleUrl: './admin-question-list.component.scss'
})
export class AdminQuestionListComponent {
  constructor(
    private userService: UserService,
    private questionListService: QuestionListService,
    private router: Router,
    private questionService: QuestionService,
    private httpClientService: HttpClientService
  ) { }

  SURVICE_ELEMENT_DATA!: any
  ELEMENT_DATA!: any
  adminMode!: any
  adminModeArray: Array<any> = []
  selectedData!: Array<any>
  deleteSuccessful!: boolean
  startDate!: any
  endDate!: any

  searchInput = ""

  jsonData!: any

  @ViewChild('sDate') sDateAuto!: ElementRef
  @ViewChild('eDate') eDateAuto!: ElementRef

  ngOnInit(): void {

    let getApi = {
      quizName: null,
      startDate: null,
      endDate: null,
      forFrontEnd: false
    }
    this.httpClientService.postApi('/quiz/getAll', getApi)
      .subscribe((data: any) => {


        this.jsonData = data;

        this.insertQuizListToService()
        this.insertQuestionsToService()

        this.updateServiceQuestionList()
        // this.updateQuestionArrayID()

        this.userService.adminMode.subscribe((result) => {
          this.adminMode = result
          if (this.adminMode) {
            this.ELEMENT_DATA = this.SURVICE_ELEMENT_DATA
            this.adminModeArray = this.SURVICE_ELEMENT_DATA
          }

        })

      })


  }

  inputSelectedData(selectedData: Array<any>) {
    this.selectedData = selectedData
  }

  deleteContent() {
    if (!this.selectedData || this.selectedData.length === 0) return;

    let deleteArray = []
    for (let item of this.selectedData) {
      if (item.statusCode == "progress" || item.statusCode == "ended") {
        this.deleteSuccessful = false
        this.openDialogSuccess()
        return
      } else {
        deleteArray.push(item.ID)
      }
    }

    this.ELEMENT_DATA = this.ELEMENT_DATA.filter((item: { ID: number }) => {
      return !this.selectedData.some(selected => selected.ID === item.ID);
    });
    let deleteApi = {
      idList: deleteArray
    }
    this.httpClientService.postApi('/quiz/delete', deleteApi)
      .subscribe((res) => {

        this.deleteSuccessful = true
        this.openDialogSuccess()
      });

    // 下面程式碼會出事(假設資料有3筆，選1、3要刪掉時會因為長度不一樣報錯)

    // let deletedArray = []
    // for (let data of this.ELEMENT_DATA) {
    //   deletedArray.push(data)
    // }
    // for (let i = 0; i < deletedArray.length; i++) {
    //   for (let data of this.selectedData) {
    //     if (data.ID == deletedArray[i].ID) {
    //       deletedArray.splice(i, 1)
    //     }
    //   }
    // }
    // this.ELEMENT_DATA = deletedArray
  }

  goAddQuestion() {
    this.questionService.editQuestionMode = false
    this.router.navigateByUrl('/addQuestion')
  }

  filterQuestions() {
    let filtered = this.adminModeArray;

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
    // for (let search of this.adminModeArray) {
    //   if (search.name.indexOf(this.searchInput) != -1) {
    //     searchArray.push(search)
    //   }
    // }
    // this.ELEMENT_DATA = searchArray
  }

  dateSearch() {
    this.filterQuestions();
    //   let searchArray = []
    //   if (this.endDate) {
    //   for (let search of this.adminModeArray) {
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
    // this.ELEMENT_DATA = this.adminModeArray
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
    this.adminModeArray = []
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
  }

  updateServiceQuestionList() {
    for (let status of this.SURVICE_ELEMENT_DATA) {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      let startDateFormat = new Date(status.sDate)
      let endDateFormat = new Date(status.eDate)

      startDateFormat.setHours(0, 0, 0, 0);
      endDateFormat.setHours(0, 0, 0, 0);

      if (!status.published) {
        status.status = '未發布'
        status.statusCode = 'unpublished'
        status.go = '編輯'
      } else if (startDateFormat <= today && endDateFormat >= today) {
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
        status.go = '編輯'
      }
    }
  }

  readonly dialog = inject(MatDialog)

  openDialog() {
    if (this.selectedData && this.selectedData.length > 0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: [],
        width: '300px',
        height: '300px',
        panelClass: 'custom-dialog-panel'

      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteContent()
        }
      });

    }
  }

  openDialogSuccess() {
    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
      data: { deleteSuccessful: this.deleteSuccessful },
      width: '300px',
      height: '300px',
      panelClass: 'custom-dialog-panel'

    });

    dialogRef.afterClosed().subscribe(result => {

    });


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
    let sDateAuto = this.sDateAuto.nativeElement as HTMLInputElement
    sDateAuto.focus()

    if (sDateAuto) {
      sDateAuto.showPicker()
    }
  }

  toEDate() {
    let eDateAuto = this.eDateAuto.nativeElement as HTMLInputElement
    eDateAuto.focus()

    if (eDateAuto) {
      eDateAuto.showPicker()
    }
  }
}

