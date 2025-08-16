import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DateConverterService } from '../../@services/date-converter.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { QuestionListService } from '../../@services/question-list.service';
import { QuestionService } from '../../@services/question.service';

@Component({
  selector: 'app-admin-add-question',
  imports: [
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './admin-add-question.component.html',
  styleUrl: './admin-add-question.component.scss'
})
export class AdminAddQuestionComponent {
  constructor(
    private dateConverterService: DateConverterService,
    private router: Router,
    private questionListService: QuestionListService,
    private questionService: QuestionService

  ) { }

  readonly dialog = inject(MatDialog);

  questionID!: number
  questionTitle!: string
  questionDirections!: string
  questionStartDate!: any
  questionEndDate!: any
  today!: string
  // checkQuestionIDBool = true

  edtiQuestionMode!: boolean
  editMode = false
  editID = 0
  saveQuestArray: Array<any> = []

  @ViewChild('ID') IDs!: ElementRef
  @ViewChild('title') titles!: ElementRef
  @ViewChild('direction') directions!: ElementRef
  @ViewChild('startDate') sDate!: ElementRef
  @ViewChild('endDate') eDate!: ElementRef

  ngOnInit(): void {
    this.initQuestionID()
    this.edtiQuestionMode = this.questionService.editQuestionMode
    this.today = this.dateConverterService.changeDateFormat(new Date())
    if (this.questionService.addQuestionData) {
      this.questionID = this.questionService.addQuestionData.ID
      this.questionTitle = this.questionService.addQuestionData.title
      this.questionDirections = this.questionService.addQuestionData.directions
      this.questionStartDate = this.questionService.addQuestionData.sDate
      this.questionEndDate = this.questionService.addQuestionData.eDate
      this.saveQuestArray = this.questionService.saveQuestArray
    }
  }
  openDialog(type: string, editId?: number): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { type: type, saveQuestArray: this.saveQuestArray, editMode: this.editMode, editId: editId },
      width: '700px',
      height: '700px',
      panelClass: 'addDialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveQuestArray = result;
      }
      else {
        this.editMode = false
      }
    });
  }

  // checkQuestionID() {
  //   for (let check of this.questionListService.ELEMENT_DATA) {
  //     if (this.questionID == check.ID) {
  //       this.checkQuestionIDBool = false
  //       return
  //     } else {
  //       this.checkQuestionIDBool = true
  //     }
  //   }

  // }
  goEdit(question: any) {
    this.editMode = true;
    this.openDialog(question.questionType, question.id)
  }
  goPreview() {
    if (!this.questionService.editQuestionMode) {
      for (let check of this.questionListService.ELEMENT_DATA) {
        if (this.questionID == check.ID) {
          alert('問卷編號重複')
          return
        }
      }
    }
    if (this.questionID <= 0 && this.questionID) {
      alert('問卷編號不能為0或負值')
    } else if (!this.questionID) {
      alert('請輸入問卷編號')
      this.IDs.nativeElement.focus()
    } else if (!this.questionTitle) {
      alert('請輸入問卷名稱')
      this.titles.nativeElement.focus()
    } else if (!this.questionDirections) {
      alert('請輸入問卷說明')
      this.directions.nativeElement.focus()
    } else if (!this.questionStartDate) {
      alert('請輸入問卷起始時間')
      this.sDate.nativeElement.focus()
    } else if (!this.questionEndDate) {
      alert('請輸入問卷結束時間')
      this.eDate.nativeElement.focus()
    } else if (!this.saveQuestArray) {
      alert('尚未設定問卷題目')
    }

    else {
      this.updateQuestArray()
      this.router.navigateByUrl('/addQuestionPreview')
    }
  }

  updateQuestArray() {

    let newQuestionArray: Array<any> = []
    for (let quest of this.saveQuestArray) {
      let newOption = [];
      if (quest.questionType != 'Text') {
        for (let array of quest.optionArray) {
          newOption.push({
            optionName: array.question,
            questionID: array.ID
          })
        }
      }
      newQuestionArray.push({
        ID: quest.id,
        required: quest.required,
        questName: quest.questionTitle,
        questionType: quest.questionType,
        options: newOption
      })
    }

    let addData = {
      ID: this.questionID,
      title: this.questionTitle,
      directions: this.questionDirections,
      sDate: this.questionStartDate,
      eDate: this.questionEndDate,
      questionArray: newQuestionArray

    }
    // 編輯用的
    this.questionService.saveQuestArray = this.saveQuestArray

    // 更新資料
    this.questionService.addQuestionData = addData
  }

  deleteOption() {
    for (let check of this.saveQuestArray) {
      if (check.checkBox) {
        let shouldDelete = confirm('確定要刪除選取的題目嗎？');
        if (!shouldDelete) {
          return
        }
        if (shouldDelete) {
          this.saveQuestArray = this.saveQuestArray.filter(item => !item.checkBox);
          return
        }
      }
    }
  }

  turnBack() {
    this.questionService.saveQuestArray = null
    this.questionService.addQuestionData = null
    this.questionService.editQuestionMode = false
    this.router.navigateByUrl('/AdminQuestionList')
  }
  toTitle() {
    this.titles.nativeElement.focus()
  }
  toDirections() {
    this.directions.nativeElement.focus()
  }
  toStartDate() {
    const startDateInput = this.sDate.nativeElement as HTMLInputElement;
    startDateInput.focus();

    if (startDateInput.showPicker) {
      startDateInput.showPicker();
    }
  }
  toEndDate() {
    const endDateInput = this.eDate.nativeElement as HTMLInputElement;
    endDateInput.focus();

    if (endDateInput.showPicker) {
      endDateInput.showPicker();
    }
  }

  initQuestionID() {
    let ID = 1
    let sortedData = this.questionListService.ELEMENT_DATA.sort((a, b) => a.ID - b.ID);

    for (let check of sortedData) {
      if (check.ID == ID) {
        ID += 1
      } else {
        this.questionID = ID
        return
      }
    }

    this.questionID = ID
  }
}
