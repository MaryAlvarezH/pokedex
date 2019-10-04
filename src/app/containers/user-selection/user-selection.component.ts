import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  @Input() pokemonSelectedList: Array<object>;
  public selectedCollection: Array<object>;
  constructor() { }

  ngOnInit() {
    this.selectedCollection = this.pokemonSelectedList;
  }

}
