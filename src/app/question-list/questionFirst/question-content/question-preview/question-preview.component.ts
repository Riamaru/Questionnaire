import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { QuestionService } from '../../../../@services/question.service';
import { ThanksDialogComponent } from './thanks-dialog/thanks-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService } from '../../../../@services/http-client.service';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../../@services/user.service';

@Component({
  selector: 'app-question-preview',
  imports: [
    MatButtonModule
  ],
  templateUrl: './question-preview.component.html',
  styleUrl: './question-preview.component.scss'
})
export class QuestionPreviewComponent {
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private httpClientService: HttpClientService,
    private userService: UserService
  ) { }

  adminMode!: boolean
  questionData!: any
  checkBoxArray: Array<any> = []
  userAge!: String

  ngOnInit(): void {
    this.userService.adminMode.subscribe((result) => {
      this.adminMode = result
    })
    this.questionData = this.questionService.questionData


    this.userAge = this.questionData.userAge

    if (Number(this.userAge) <= 0 || this.userAge == null) {
      this.userAge = "秘密"
    }

  }
  goBackButtonPressed() {

    this.router.navigateByUrl('/QuestionContent')
  }
  saveButtonPressed() {

    this.updateDataToSql()


    // this.updateData()


    this.questionService.questionData = null

  }

  readonly dialog = inject(MatDialog)

  openDialog() {
    const dialogRef = this.dialog.open(ThanksDialogComponent, {
      data: [],
      width: '300px',
      height: '300px',
      panelClass: 'addDialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/QuestionList')
    });
  }

  updateDataToSql() {
    let answerVoList = []
    for (let item of this.questionData.questionArray) {
      let answerList = []
      if (item.questionType == "Single") {
        for (let options of item.options) {
          if (item.radioAnswer == options.questionID) {
            answerList.push(options.optionName)
          }
        }
      } else if (item.questionType == "Multi") {
        for (let options of item.options) {
          if (options.selectedAnswerBool) {
            answerList.push(options.optionName)
          }
        }
      } else if (item.questionType == "Text") {
        answerList.push(item.textAnswer)
      }

      answerVoList.push({
        quesId: item.ID,
        answerList: answerList
      })
    }

    let inputData = {
      userName: this.questionData.userName,
      phone: this.questionData.userPhone,
      email: this.questionData.userEmail,
      age: this.questionData.userAge,
      quizId: this.questionData.ID,
      answerVoList: answerVoList
    }

    this.httpClientService.postApi('/quiz/fillin', inputData)
      .subscribe((response) => {

        this.openDialog();

      });

  }
  // updateData() {
  //   let index = this.questionService.questionResultArray.findIndex(index => index.ID == this.questionData.ID)

  //   // this.questionService.questionResultArray[index]

  //   for (let main of this.questionData.questionArray) {
  //     if (main.questionType == 'Single') {
  //       if (main.radioAnswer) {
  //         let option = main.options.findIndex((option: any) => option.questionID == main.radioAnswer)
  //         for (let push of this.questionService.questionResultArray[index].chartData) {
  //           if (push.questionType == 'Single' && push.ID == main.ID.toString()) {
  //             push.data[option] += 1
  //           }
  //         }
  //       }
  //     } else if (main.questionType == 'Multi') {
  //       for (let push of main.options) {
  //         if (push.selectedAnswerBool) {
  //           for (let add of this.questionService.questionResultArray[index].chartData) {
  //             let search = add.labels.indexOf(push.optionName)
  //             if (add.questionType == 'Multi') {
  //               if (search != -1) {
  //                 add.data[search] += 1
  //               }
  //             }
  //           }
  //         }
  //       }

  //     }
  //     else if (main.questionType == 'Text') {
  //       for (let push of this.questionService.questionResultArray[index].chartData) {
  //         if (push.questionType == 'Text' && push.ID == main.ID.toString()) {
  //           if (main.textAnswer) {
  //             push.data.push(main.textAnswer)
  //             let filterData = push.data.filter((item: any) => item.trim() != '')
  //             push.data = filterData
  //           }
  //         }
  //       }
  //     }
  //   }


  // }
}
