import { Component, OnInit } from '@angular/core';

import { ApplicationsService } from '../../shared/services/applications.service';
import { FlowsService } from '../../shared/services/flows.service';

import * as shape from 'd3-shape';

@Component({
  selector: 'app-ngxchart',
  templateUrl: './ngxchart.component.html',
  styleUrls: ['./ngxchart.component.css']
})
export class NgxchartComponent implements OnInit {
  curve: any = shape.curveLinear;
  view: any[];
  autoZoom: boolean = false;
  panOnZoom: boolean = false;
  enableZoom: boolean = false;
  autoCenter: boolean = true;
  showLegend: boolean = false;
  colorScheme: any = {
    domain: ['#3f51b5', '#2196f3', '#8561c5', '#AAAAAA']
  };


  applications = [];
  flows = [];

  nodes: any[] = [];

  links: any[] = [];

  constructor(private applicationsService: ApplicationsService, private flowsService: FlowsService) { }

  ngOnInit() {
    this.loadData();  

  }

  loadData() {
    this.applicationsService.findAll().subscribe(data => {
      this.applications = data;
      
      for(let e of this.applications) {
        e.id = e.id.toString();
        e.label = e.name;
      }
      this.nodes = this.applications;
    });

    this.flowsService.findAll().subscribe(data => {
      this.flows = data;
      for(let e of this.flows) {
        //delete e.id;
        e.id = null;
        e.source = e.id_applications_source.toString();
        e.target = e.id_applications_target.toString();
        e.label = e.name;
      }
      this.links = this.flows;
    });
  }


  select(event) {
    console.log('bite');
  }

}
