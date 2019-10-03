import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCollectionService {
  public currentCollection$: Subject<Array<object>> = new Subject;

  constructor() { }
}
