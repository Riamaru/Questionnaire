import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';



@Component({
  selector: 'app-log-out-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './log-out-dialog.component.html',
  styleUrl: './log-out-dialog.component.scss'
})
export class LogOutDialogComponent {


  readonly dialogRef = inject(MatDialogRef<LogOutDialogComponent>);
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
