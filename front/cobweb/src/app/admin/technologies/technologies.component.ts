import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Services
import { TechnologiesService } from '../../shared/services/technologies.service';

// Components
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  technologies = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private technologiesService: TechnologiesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.technologiesService.findAll().subscribe(data => {
      this.technologies = data;
    });
  }

  addDialog() {

  }

  deleteDialog(element) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { technology: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });

  }


}
