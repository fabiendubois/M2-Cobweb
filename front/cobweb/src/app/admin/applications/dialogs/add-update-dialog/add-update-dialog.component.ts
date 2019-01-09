import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { ApplicationsService } from '../../../../shared/services/applications.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent implements OnInit {

  applicationForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    team: ['', Validators.required],
  });
  
  constructor(
    private fb: FormBuilder,
    private applicationsService: ApplicationsService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public application: any) { }

  ngOnInit() {
  }

  onUpdateOrCreate(): void {
    if (this.application.id === undefined) {
      this.applicationsService.add(this.applicationForm.value)
        .subscribe(data => {
          this.dialogRef.close();
        });
    }
  }
}
