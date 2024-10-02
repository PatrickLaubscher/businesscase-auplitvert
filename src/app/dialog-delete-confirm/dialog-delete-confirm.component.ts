import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-confirm',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrl: './dialog-delete-confirm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class DialogDeleteConfirmComponent {

  readonly dialogRef = inject(MatDialogRef<DialogDeleteConfirmComponent>);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
