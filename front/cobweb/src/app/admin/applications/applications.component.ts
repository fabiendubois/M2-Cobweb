import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../../shared/services/applications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'team', 'actions'];

  constructor(private applicationsService: ApplicationsService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.applicationsService.findAll().subscribe(data => {
      this.applications = data;
    });
  }

}
