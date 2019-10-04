import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-bars',
  templateUrl: './statistic-bars.component.html',
  styleUrls: ['./statistic-bars.component.scss']
})
export class StatisticBarsComponent implements OnInit {

  @Input() baseStat: number;
  public stat: number;
  public attackStatAvg: number;
  public barsAvgList = [];

  constructor() { }

  ngOnInit() {
    this.stat = this.baseStat;
    this.getStatisticalAvg();
  }

  getStatisticalAvg() {
    const MAX_BASE_STATE = 120;
    this.attackStatAvg = Math.round((this.baseStat * 5) / MAX_BASE_STATE);
    for (let i = 5; i >= 1; i--) {
      const barsAvg = {id: i};
      barsAvg['status'] = i <= this.attackStatAvg ? 'active' : 'inactive';

      this.barsAvgList.push(barsAvg);
    }
  }
}
