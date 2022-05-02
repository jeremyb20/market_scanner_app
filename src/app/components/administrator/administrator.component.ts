import { Component, OnInit} from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})

export class AdministratorComponent implements OnInit {
  public data = {};
  currentTheme: any;
  translator:any;
  currentLang: any;

  //pie options start
  public pieChartOptions: ChartOptions;
  public pieChartLabels: Label[] = [['Download Sales'], ['In Store Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  //pie options end

  //line chart start
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions;
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType : ChartType =  'line';
  public lineChartPlugins = [];
  //linechart end

  //barChartOptions start

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

//barChartOptions end


  constructor( private themeService: ThemeService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    this.currentTheme = this.themeService.getThemeSelected();

    this.barChartOptions = {
      responsive: true,
      legend: {
          labels: {
            fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
            fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
            fontSize: 17
          }
        },
      scales: {
        yAxes: [{
            ticks: {
              fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
              beginAtZero: true
            }
        }],
        xAxes: [{
            ticks: {
              fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
              beginAtZero: true
            }
        }]
      },
      tooltips: {
          titleFontColor:'#d4d4d4'
      },
      title: {
        fontColor:'white'
      }
    };

    this.lineChartColors = [
      {
        borderColor: (this.currentTheme == 'theme-default')? 'none': 'white',
        backgroundColor: 'rgba(0,31,255,0.3)',
      },
    ];

    this.lineChartOptions = {
      responsive: true,
      legend: {
        labels: {
          fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          fontSize: 17
        }
      },
      scales: {
        yAxes: [{
            ticks: {
              fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
              beginAtZero: true
            }
        }],
        xAxes: [{
            ticks: {
              fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
              beginAtZero: true
            }
        }]
      },
      tooltips: {
        titleFontColor:'white'
      }
    };

    this.pieChartOptions = {
      responsive: true,
      legend: {
        labels: {
          fontColor: (this.currentTheme == 'theme-default')? 'black': 'white',
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
          fontSize: 17
        }
      },
      tooltips: {
        titleFontColor:'white'
      }
    };
  }

  ngOnInit(): void {}

}
