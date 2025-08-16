import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,

} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }
  OkButtonPressed(){
    let returnData = true;
    this.dialogRef.close(returnData);
  }

  closeButtonPressed(){
    this.dialogRef.close();
  }
}
