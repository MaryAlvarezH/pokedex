import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-statistics',
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.scss']
})
export class PokemonStatisticsComponent implements OnInit {

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
    // console.log('prom', this.baseStat)
    // console.log('avg', this.attackStatAvg)
    // console.log('barList', this.barsAvgList)
  }

}
