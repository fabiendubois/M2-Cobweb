import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { FlowsService } from '../../../../shared/services/flows.service';
import { ApplicationsService } from '../../../../shared/services/applications.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent implements OnInit {

  flowForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    id_applications_source: [null, Validators.required],
    id_applications_target: [null, Validators.required]

  });

  applications_source = [];
  applications_target = [];

  constructor( 
    private fb: FormBuilder,
    private flowsService: FlowsService,
    private applicationsService: ApplicationsService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public flow: any) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.applicationsService.findAll().subscribe(data => {
      this.applications_source = data;
      this.applications_target = data;
    });
  }

  onUpdateOrCreate(): void {
    if (this.flow.id === undefined) {
      this.flowsService.add(this.flowForm.value)
        .subscribe(data => {
          this.dialogRef.close();
        });
    }
  }
}