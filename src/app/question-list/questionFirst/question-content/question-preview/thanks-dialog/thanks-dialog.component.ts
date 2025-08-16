import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


@Component({
  selector: 'app-thanks-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './thanks-dialog.component.html',
  styleUrl: './thanks-dialog.component.scss'
})
export class ThanksDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ThanksDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }
  OkButtonPressed() {
    let returnData = true;
    this.dialogRef.close(returnData);
  }

  closeButtonPressed() {
    this.dialogRef.close();
  }
}
