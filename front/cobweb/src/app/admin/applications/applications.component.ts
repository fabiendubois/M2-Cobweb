import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Service
import { ApplicationsService } from '../../shared/services/applications.service';

// Component
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'team', 'actions'];

  constructor(private applicationsService: ApplicationsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.applicationsService.findAll().subscribe(data => {
      this.applications = data;
    });
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddUpdateDialogComponent, {
      data: {}
    });
 
    dialogRef.afterClosed().subscribe(result => {
        this.loadData();
    });
  }

  deleteDialog(element) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { application: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

}
