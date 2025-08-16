import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,

} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-success-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './delete-success-dialog.component.html',
  styleUrl: './delete-success-dialog.component.scss'
})
export class DeleteSuccessDialogComponent {

  deleteSuccessful!: boolean;

  readonly dialogRef = inject(MatDialogRef<DeleteSuccessDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.deleteSuccessful = this.data.deleteSuccessful;
  }
  OkButtonPressed() {
    this.dialogRef.close();
  }


}
