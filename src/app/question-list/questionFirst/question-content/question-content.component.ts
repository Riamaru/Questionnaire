import { UserService } from '../../../@services/user.service';
import { Component, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../@services/question.service';
import { Router } from '@angular/router';
import { QuestionListService } from '../../../@services/question-list.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientService } from '../../../@services/http-client.service';

@Component({
  selector: 'app-question-content',
  imports: [
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './question-content.component.html',
  styleUrl: './question-content.component.scss'
})
export class QuestionContentComponent {
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private userService: UserService,
    private questionListService: QuestionListService,
    private httpClientService: HttpClientService
  ) { }

  userName = ""
  userPhone = ""
  userEmail = ""
  userAge = ""
  adminMode!: boolean
  newQuestionArray: Array<any> = []
  question!: any
  feedbackMode!: boolean
  questionErrorList: boolean[] = [];
  questionServiceQuestionData!: any

  @ViewChild('nameInput') name!: ElementRef
  @ViewChild('phoneInput') phone!: ElementRef
  @ViewChild('mailInput') mail!: ElementRef
  @ViewChild('ageInput') age!: ElementRef
  @ViewChild('option') option!: ElementRef
  @ViewChildren('optionGroup') optionGroups!: QueryList<ElementRef>;

  ngOnInit(): void {
    let index = this.questionService.questListArray.findIndex(index => index.ID == this.questionListService.questionID)
    this.feedbackMode = this.userService.feedbackMode
    this.question = this.questionService.questListArray[index]
    this.userService.adminMode.subscribe((result) => {
      this.adminMode = result
    });

    this.questionServiceQuestionData = this.questionService.questionData
    if (!this.questionServiceQuestionData) {
      this.addAnswerField()
    } else {
      this.userName = this.questionServiceQuestionData.userName
      this.userEmail = this.questionServiceQuestionData.userEmail

      if (!this.adminMode) {
        this.userPhone = this.questionServiceQuestionData.userPhone
        this.userAge = this.questionServiceQuestionData.userAge
      } else {
        if (Number(this.questionServiceQuestionData.userPhone) <= 0) {
          this.userPhone = "使用者未填寫"
        } else {
          this.userPhone = this.questionServiceQuestionData.userPhone
        }

        if (Number(this.questionServiceQuestionData.userAge) <= 0) {
          this.userAge = "使用者未填寫"
        } else {
          this.userAge = this.questionServiceQuestionData.userAge
        }
      }


      this.newQuestionArray = this.questionServiceQuestionData.questionArray
    }
    this.questionErrorList = this.newQuestionArray.map(() => false);
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

  previewButtonPressed() {
    const emailRegex = /^([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]+)\.?$/;

    for (let check of this.newQuestionArray) {
      if (check.required) {
        let index = this.newQuestionArray.findIndex(index => index.ID == check.ID)
        if (check.questionType == 'Multi') {
          let checkM = false
          for (let option of check.options) {
            if (option.selectedAnswerBool) {
              checkM = true
              this.questionErrorList[index] = false
            }
          }
          if (!checkM) {
            this.questionErrorList[index] = true
            this.optionGroups.toArray()[index]?.nativeElement?.querySelector('input, textarea')?.focus();
            alert('請確認必填欄位是否已填寫完畢')
            return
          }
        } else if (check.questionType == 'Single') {
          if (!check.radioAnswer) {
            this.questionErrorList[index] = true
            this.optionGroups.toArray()[index]?.nativeElement?.querySelector('input, textarea')?.focus();
            alert('請確認必填欄位是否已填寫完畢')
            return
          } else {
            this.questionErrorList[index] = false
          }
        } else if (check.questionType == 'Text') {
          if (!check.textAnswer) {
            this.questionErrorList[index] = true
            this.optionGroups.toArray()[index]?.nativeElement?.querySelector('input, textarea')?.focus();
            alert('請確認必填欄位是否已填寫完畢')
            return
          } else {
            this.questionErrorList[index] = false
          }
        }
      }
    }
    if (!this.userName.trim()) {
      this.name.nativeElement.focus()
      alert('請輸入名稱')
      return
    } else if (!this.userEmail) {
      this.mail.nativeElement.focus()
      alert('請輸入信箱')
      return
    } else if (!emailRegex.test(this.userEmail)) {
      this.mail.nativeElement.focus()
      alert('請輸入正確的信箱格式')
      return
    }
    else if (this.userPhone && (!/^\d+$/.test(this.userPhone))) {
      this.phone.nativeElement.focus()
      alert("手機請正確輸入數字(可空白)")
      return
    }
    else if (this.userAge && (!/^\d+$/.test(this.userAge) || Number(this.userAge) <= 0)) {
      this.age.nativeElement.focus()
      alert('年齡請正確輸入數字(可空白)')
      return
    }

    this.httpClientService.postApi("/quiz/feedback?quizId=" + this.questionListService.questionID, {})
      .subscribe((res: any) => {

        for (let item of res.feedbackVoList) {
          if (this.userEmail == item.email) {
            alert("此信箱使用者已填寫過此張問卷");
            return
          }
        }

        this.questionService.questionData = {
          ID: this.question.ID,
          title: this.question.title,
          directions: this.question.directions,
          sDate: this.question.sDate,
          eDate: this.question.eDate,
          userName: this.userName,
          userPhone: this.userPhone,
          userEmail: this.userEmail,
          userAge: this.userAge,
          questionArray: this.newQuestionArray
        }


        this.router.navigateByUrl('/QuestionPreview')
      })
  }

  goBackButtonPressed() {
    this.questionService.questionData = null
    if (!this.adminMode) {
      this.router.navigateByUrl('/QuestionList')
    } else if (this.adminMode && !this.userService.feedbackMode) {
      this.router.navigateByUrl('/AdminQuestionList')
    } else {
      this.userService.feedbackMode = false
      this.router.navigateByUrl('/feedback')
    }
  }

  changeToPhone() {
    this.phone.nativeElement.focus()
  }
  changeToMail() {
    this.mail.nativeElement.focus()
  }
  changeToAge() {
    this.age.nativeElement.focus()
  }
  changeToOption() {
    this.option.nativeElement.focus()
  }

  validatePhoneNumber() {
    if (this.userPhone) {
      this.userPhone = this.userPhone.replace(/[^0-9]/g, '');
    }
  }
  validateEmail() {
    if (this.userEmail) {
      this.userEmail = this.userEmail.replace(/[^\x20-\x7E]/g, '');
    }
  }
  validateAgeNumber() {
    if (this.userAge) {
      this.userAge = this.userAge.replace(/[^0-9]/g, '');
    }
  }
}
