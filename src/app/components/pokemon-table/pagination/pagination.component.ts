import { Component, OnInit } from '@angular/core';
import { ConfigTableService } from 'src/app/services/config-table.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  public config = {};
  public collection;

  constructor(public configTableService: ConfigTableService) { 
  }

  ngOnInit() {
    this.config = this.configTableService.config
  }


  onPageChanged(event){
    this.configTableService.config.currentPage = event;
  }

}
