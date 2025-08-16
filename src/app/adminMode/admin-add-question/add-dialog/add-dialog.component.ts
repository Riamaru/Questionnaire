import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  questionTitle!: string
  questionType = ""
  saveQuestionArray: Array<any> = []
  optionArray!: Array<any>
  optionId = 2
  requiredCheckBox = false
  editMode = false
  editId = 0
  questID = 0

  hidePlusButton = false


  ngOnInit(): void {
    this.saveQuestionArray = structuredClone(this.data.saveQuestArray);
    this.editMode = this.data.editMode;
    this.editId = this.data.editId;
    this.questionType = this.data.type

    if (this.editMode) {
      for (let questArray of this.saveQuestionArray) {
        if (questArray.id == this.data.editId) {
          this.questionTitle = questArray.questionTitle;
          this.requiredCheckBox = questArray.required;
          this.questionType = questArray.questionType;
          this.optionArray = questArray.optionArray;
        }
      }
    } else {
      this.resetOptionArray()
    }
  }

  resetOptionArray() {
    this.optionArray = [
      { ID: 1, question: '' },
      { ID: 2, question: '' }
    ]
  }
  getQuestStatsName(type: string): string {
    if (type == 'Multi') return '多選';
    if (type == 'Single') return '單選';
    if (type == 'Text') return '文字';
    return '';
  }

  addOption() {
    this.optionId++;
    if (this.optionArray.length == 19) {
      this.hidePlusButton = true
    }
    if (this.optionArray.length < 20) {
      this.optionArray.push(
        { ID: this.optionId, question: '' }
      );
    }
  }

  deleteOption(index: number) {
    if (this.optionArray.length > 1) {
      this.optionArray.splice(index, 1);
    }
  }



  saveButtonPressed() {
    if (this.questionTitle) {
      let questionTypeChinese = this.getQuestStatsName(this.questionType)

      if (this.questionType != 'Text') {
        for (let questArray of this.optionArray) {
          if (questArray.question.trim().length == 0) {
            alert('選項名稱不能為空');
            return;
          }
        }
        let optionNames = this.optionArray.map(opt => opt.question.trim());
        let duplicates = optionNames.filter((name, index) => optionNames.indexOf(name) !== index);
        if (duplicates.length > 0) {
          alert(`選項名稱「${duplicates[0]}」重複，請修改後再儲存`);
          return;
        }
      }

      if (!this.editMode) {

        this.questID = this.saveQuestionArray.length > 0
          ? Math.max(...this.saveQuestionArray.map(q => q.id)) + 1
          : 1;

        this.saveQuestionArray.push({
          id: this.questID,
          questionTitle: this.questionTitle,
          required: this.requiredCheckBox,
          checkBox: false,
          questionType: this.questionType,
          questionTypeChinese: questionTypeChinese,
          optionArray: this.optionArray
        });

      } else {
        for (let data = 0; data < this.saveQuestionArray.length; data++) {
          if (this.saveQuestionArray[data].id == this.editId) {
            this.saveQuestionArray[data] = {
              id: this.editId,
              questionTitle: this.questionTitle,
              required: this.requiredCheckBox,
              checkBox: false,
              questionType: this.questionType,
              questionTypeChinese: questionTypeChinese,
              optionArray: this.optionArray
            };
          }
        }
        this.editMode = false;
      }
      this.dialogRef.close(this.saveQuestionArray);
    } else {
      alert('問卷名稱不能為空');
    }




    // this.dialogRef.close(this.saveQuestionArray);
  }
  closeButtonPressed() {
    this.editMode = false
    this.dialogRef.close();
  }
}
