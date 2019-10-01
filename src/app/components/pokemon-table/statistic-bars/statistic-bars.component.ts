import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-bars',
  templateUrl: './statistic-bars.component.html',
  styleUrls: ['./statistic-bars.component.scss']
})
export class StatisticBarsComponent implements OnInit {

  @Input() baseStat: number;
  public attackStatAvg: number;
  public barsAvgList = [];

  constructor() { }

  ngOnInit() {
    this.loadInputData();
  }

  loadInputData(){
    if (this.baseStat>0) {
      this.getStatisticalAvg();
    } else {
      setTimeout(()=> {
        this.loadInputData();
      }, 1000)
    }
  }

  getStatisticalAvg() {
    const MAX_BASE_STATE = 130;
    this.attackStatAvg = Math.round((this.baseStat * 5) / MAX_BASE_STATE); 
    for(let i=5; i>=1; i--) {
      let barsAvg = {id: i}
      barsAvg['status'] = i<=this.attackStatAvg? 'active':'inactive'

      this.barsAvgList.push(barsAvg)
    }
  }

}
