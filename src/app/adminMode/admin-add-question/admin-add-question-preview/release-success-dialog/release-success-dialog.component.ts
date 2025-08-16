import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
  MatDialogTitle,

} from '@angular/material/dialog';
import { QuestionService } from '../../../../@services/question.service';


@Component({
  selector: 'app-release-success-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './release-success-dialog.component.html',
  styleUrl: './release-success-dialog.component.scss'
})
export class ReleaseSuccessDialogComponent {
  constructor(
    private questionService: QuestionService) {
  }

  edtiQuestionMode!: boolean
  overToday!: boolean

  readonly dialogRef = inject(MatDialogRef<ReleaseSuccessDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.overToday = this.data.overToday;

    this.edtiQuestionMode = this.questionService.editQuestionMode
  }

  OkButtonPressed() {
    let returnData = true;
    this.dialogRef.close(returnData);
  }

}
