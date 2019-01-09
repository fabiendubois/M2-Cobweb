import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Service
import { FlowsService } from '../../shared/services/flows.service';

// Component
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.css']
})
export class FlowsComponent implements OnInit {

  flows = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'id_application_source', 'id_application_target', 'actions'];

  constructor(private flowsService: FlowsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.flowsService.findAll().subscribe(data => {
      this.flows = data;
    });
  }

  deleteDialog(element){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { application: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  addDialog(){
    const dialogRef = this.dialog.open(AddUpdateDialogComponent, {
      data: {}
    });
 
    dialogRef.afterClosed().subscribe(result => {
        this.loadData();
    });
  }

}
