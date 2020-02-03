import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  ammounts = [5, 10, 20];
  isOnlineOnly = false;
  activeAmount: any = null;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top'
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };
  public pieChartLabels: Label[] = ['FEMALE', 'MALE'];
  public pieChartData: number[] = [0, 0];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)']
    }
  ];

  public lineChartData: ChartDataSets[] = [];
  public allUsers: any;
  public sorted: any;
  public chartsData: any = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left'
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)'
          },
          ticks: {
            fontColor: 'red'
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineCharttypeTwo = 'pie';

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getGraphs().subscribe(resp => {
      this.isLoading = false;
      this.allUsers = resp.data;
      this.findReachPerson(this.allUsers);
    });
  }

  public findReachPerson(allUsers: any) {
    this.sorted = allUsers.sort((a: any, b: any) => {
      return parseFloat(b.balance.substr(1).replace(',', '')) - parseFloat(a.balance.substr(1).replace(',', ''));
    });
    console.log(this.sorted);
    this.createChart();
    this.setGender();
  }

  public createChart() {
    this.activeAmount = null;
    this.isOnlineOnly = false;
    this.lineChartData = [];
    this.chartsData = [];
    if (this.sorted.length) {
      this.sorted.forEach((elem: any) => {
        console.log(elem, 'elem', this.sorted);
        let value = parseFloat(elem.balance.substr(1).replace(',', ''));
        this.chartsData.push({ data: [0, value], label: elem.company, gender: elem.gender });
      });
    }
    this.lineChartData = this.chartsData.splice(0, 10);
    this.setGender();
  }

  public moreLessElements(elem: number) {
    this.lineChartData = [];
    this.lineChartData = this.chartsData.splice(0, elem);
    this.activeAmount = elem;
    this.setGender();
  }

  public findOnline() {
    this.activeAmount = null;
    this.lineChartData = [];
    this.chartsData = [];
    this.isOnlineOnly = true;
    if (this.sorted.length) {
      this.sorted.forEach((elem: any) => {
        if (elem.isActive) {
          let value = parseFloat(elem.balance.substr(1).replace(',', ''));
          this.chartsData.push({ data: [0, value], label: elem.company });
        }
      });
    }
    this.lineChartData = this.chartsData.splice(0, 10);
    this.setGender();
  }

  public allUsersShow() {
    this.activeAmount = null;
    this.lineChartData = this.chartsData;
    this.setGender();
  }

  public setGender() {
    this.pieChartData = [0, 0];
    this.lineChartData.forEach(elem => {
      if (elem['gender'] === 'female') {
        this.pieChartData[0] = this.pieChartData[0] + 1;
      } else {
        this.pieChartData[1] = this.pieChartData[1] + 1;
      }
    });
  }
}
