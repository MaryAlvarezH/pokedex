import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigTableService {
  // public config$: Subject<object> = new Subject;

  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };
  
  constructor() { }

  public addPaginationConfig(totalItems) {
    this.config['totalItems'] = totalItems
    // this.config$.next(this.config);
  }
  
}