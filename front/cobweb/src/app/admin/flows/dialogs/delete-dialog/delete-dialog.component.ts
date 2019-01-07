import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { FlowsService } from '../../../../shared/services/flows.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private flowsService: FlowsService,
    public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public flow: any) { }

  ngOnInit() {
  }

  onDelete() {
    this.flowsService.deleteById(this.flow.flow.id).subscribe(
      data => {
        this.snackBar.open('successful deletion', '', {
          duration: 2000
        });
        this.dialogRef.close();
      },
      error => {
        if(error.error.error) {
          this.snackBar.open(error.error.error, '', {
            duration: 2000
          });
        } else { 
          this.snackBar.open('Error : ' + ' ' + error.status + ' ' + error.statusText, '', {
            duration: 2000
          });
        }
      },
    );
  }
}