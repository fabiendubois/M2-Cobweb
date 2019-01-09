import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { TechnologiesService } from '../../../../shared/services/technologies.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-add-update-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent implements OnInit {

  technologyForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public technology: any,
    private technologiesService: TechnologiesService) { }

  ngOnInit() {
  }

  onUpdateOrCreate(): void {
    if (this.technology.id === undefined) {
      this.technologiesService.add(this.technologyForm.value)
        .subscribe(data => {
          this.dialogRef.close();
        });

    } else {
      /*
      -- Update Evolution --
      this.technologiesService.updateById(this.technology)
        .subscribe(data => {
          this.dialogRef.close();
        });
      */
    }
  }

}
