import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { QuestionService } from '../../../@services/question.service';
import { UserService } from '../../../@services/user.service';
import { QuestionListService } from '../../../@services/question-list.service';
import { MatDialog } from '@angular/material/dialog';
import { ReleaseSuccessDialogComponent } from './release-success-dialog/release-success-dialog.component';
import { HttpClientService } from '../../../@services/http-client.service';

@Component({
  selector: 'app-admin-add-question-preview',
  imports: [
    MatButtonModule
  ],
  templateUrl: './admin-add-question-preview.component.html',
  styleUrl: './admin-add-question-preview.component.scss'
})
export class AdminAddQuestionPreviewComponent {
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private userService: UserService,
    private questionListService: QuestionListService,
    private httpClientService: HttpClientService
  ) { }

  adminMode!: boolean
  editQuestionMode!: boolean
  question!: any

  questionResultDataPush!: any

  published = false
  questionArray: Array<any> = []
  overToday = false

  ngOnInit(): void {

    this.editQuestionMode = this.questionService.editQuestionMode
    this.question = this.questionService.addQuestionData

    this.questionArray = this.questionService.addQuestionData.questionArray



    this.userService.adminMode.subscribe((result) => {
      this.adminMode = result
    });


  }

  saveButtonPressed() {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let startDateFormat = new Date(this.question.sDate)

    if (startDateFormat < today) {
      this.overToday = true
      this.openDialog(this.overToday)
      return
    }

    this.published = false;

    if (!this.editQuestionMode) {
      this.pushToList();
    } else {
      this.updateToSql();
    }
    this.updateResultData()
    this.pushToResultArray()
    this.questionService.addQuestionData = null
    this.questionService.saveQuestArray = null

  }

  releaseButtonPressed() {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let startDateFormat = new Date(this.question.sDate)

    if (startDateFormat < today) {
      this.overToday = true
      this.openDialog(this.overToday)
      return
    }

    this.published = true;
    if (!this.editQuestionMode) {
      this.pushToList()
      // this.pushToQuestionArray()
      // this.pushToResultArray()
    } else {
      this.updateToSql();
    }

    this.updateResultData()
    this.pushToResultArray()
    this.questionService.addQuestionData = null
    this.questionService.saveQuestArray = null


  }

  pushToList() {
    let optionArray = []

    for (let item of this.questionArray) {

      let optionNameArray = []
      for (let questionName of item.options) {

        optionNameArray.push(questionName.optionName)
      }

      optionArray.push({
        quizId: 0,
        quesId: item.ID,
        question: item.questName,
        type: item.questionType,
        required: item.required,
        options: optionNameArray
      })

    }

    let newQuestion = {
      title: this.question.title,
      description: this.question.directions,
      startDate: this.question.sDate,
      endDate: this.question.eDate,
      published: this.published,
      questionVos: optionArray
    }


    this.httpClientService.postApi('/quiz/create', newQuestion)
      .subscribe((result) => {

        this.openDialog(this.overToday)
        this.questionService.editQuestionMode = false
        this.router.navigateByUrl('/AdminQuestionList')


      })



    // let check = this.questionListService.ELEMENT_DATA.findIndex(
    //   item => item.ID == this.question.ID
    // );
    // if (check == -1) {

    //   this.questionListService.ELEMENT_DATA.push(newQuestion)
    // }

  }

  updateToSql() {
    let optionArray = []

    for (let item of this.questionArray) {

      let optionNameArray = []
      for (let questionName of item.options) {

        optionNameArray.push(questionName.optionName)
      }

      optionArray.push({
        quizId: this.question.ID,
        quesId: item.ID,
        question: item.questName,
        type: item.questionType,
        required: item.required,
        options: optionNameArray
      })

    }

    let newQuestionData = {
      quizId: this.question.ID,
      title: this.question.title,
      description: this.question.directions,
      startDate: this.question.sDate,
      endDate: this.question.eDate,
      published: this.published,
      questionVos: optionArray
    }


    this.httpClientService.postApi('/quiz/update', newQuestionData)
      .subscribe((result) => {


        this.openDialog(this.overToday)
        this.questionService.editQuestionMode = false
        this.router.navigateByUrl('/AdminQuestionList')



      })

  }

  // pushToQuestionArray() {
  // let check = this.questionService.questListArray.findIndex(
  //   item => item.ID == this.question.ID
  // );
  // if (check == -1) {
  //   this.questionService.questListArray.push(this.question)
  // } else {
  //   this.questionService.questListArray[check] = this.question
  // }
  // }

  pushToResultArray() {
    let check = this.questionService.questionResultArray.findIndex(
      item => item.ID == this.question.ID
    );

    if (check == -1) {
      this.questionService.questionResultArray.push(this.questionResultDataPush)
    } else {
      this.questionService.questionResultArray[check] = this.questionResultDataPush
    }
  }
  goBackButtonPressed() {
    this.router.navigateByUrl('/addQuestion')
  }


  readonly dialog = inject(MatDialog)

  openDialog(overToday: boolean) {
    const dialogRef = this.dialog.open(ReleaseSuccessDialogComponent, {
      data: { overToday: overToday },
      width: '300px',
      panelClass: 'addDialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigateByUrl('/AdminQuestionList')

    });
  }

  updateResultData() {
    let charDataArray = []
    for (let pullData of this.question.questionArray) {
      let labelsArray = []
      let dataAmountArray = []
      for (let pullOptionData of pullData.options) {
        labelsArray.push(pullOptionData.optionName)
        dataAmountArray.push(0)
      }

      if (pullData.questionType != 'Text') {
        charDataArray.push({
          ID: pullData.ID,
          questionType: pullData.questionType,
          name: pullData.questName,
          labels: labelsArray,
          data: dataAmountArray,
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF',
            '#FF77FF',
            '#BB5E00',
            '#984B4B',
            '#5A5AAD',
            '#949449',
            '#BF0060',
            '#9393FF',
            '#467500',
            '#844200',
            '#FFAF60',
            '#A6A6D2',
            '#97CBFF',
            '#006000',
            '#6C3365',
          ]
        })
      } else {
        charDataArray.push({
          ID: pullData.ID,
          questionType: pullData.questionType,
          name: pullData.questName,
          labels: labelsArray,
          data: [],
          backgroundColor: []
        })
      }
    }

    let questionResultData = {
      ID: this.question.ID,
      title: this.question.title,
      sDate: this.question.sDate,
      eDate: this.question.eDate,
      chartData: charDataArray
    }

    this.questionResultDataPush = questionResultData
  }

}
