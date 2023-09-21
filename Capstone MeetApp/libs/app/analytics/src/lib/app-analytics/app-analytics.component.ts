import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//import { Chart } from 'chart.js';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import Chart from 'chart.js/auto';
import { NgZone } from '@angular/core';
import { service} from '@capstone-meet-app/services';


@Component({
  selector: 'capstone-meet-app-app-analytics',
  standalone: true,
  imports: [CommonModule,IonicModule,NgxChartsModule ],
  templateUrl: './app-analytics.component.html',
  styleUrls: ['./app-analytics.component.css'],
})
export class AppAnalyticsComponent  implements AfterViewInit {
  @ViewChild('pieChartCanvas') private pieChartCanvas!: ElementRef;
  @ViewChild('histogramCanvas') private histogramCanvas!: ElementRef
  
  private pieChart: Chart<'pie', number[], string> | undefined;
  private histogramChart: Chart<'bar', number[], string> | undefined;
  histogramData: any[] = [10, 20, 30, 40, 50];


 constructor(private zone: NgZone, private apiService: service) { }

  ngAfterViewInit() {
    this.zone.run(() => {
      this.createPieChart();
      this.createHistogram();
    });
  }
  private createHistogram() {
    if (this.histogramCanvas) {
      const ctx = this.histogramCanvas.nativeElement.getContext('2d');

      if (ctx) {
        this.histogramChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.histogramData.map((_, index) => index.toString()),
            datasets: [
              {
                label: 'Histogram',
                data: this.histogramData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }
  private createPieChart() {
    if (this.pieChartCanvas) {
      const ctx = this.pieChartCanvas.nativeElement.getContext('2d');

      if (ctx) {
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Label 1', 'Label 2', 'Label 3'],
            datasets: [{
              data: [30, 45, 25],
              backgroundColor: ['#FF5733', '#33FF57', '#5733FF'],
            }]
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
              title: {
                display: true,
                text: 'My Pie Chart',
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });
      }
    }
  }
  

  /* Analytics Services */

  async getTop3Events()
  {
    await this.apiService.getTop3Events().subscribe((response:any) => {
      console.log('Top_3 Events: ',response);
    });  
  }

  async getTopEvent()
  {
    await this.apiService.getTopEvent().subscribe((response:any) => {
      console.log('Top Event: ',response);
    });  
  }

  async getTop3Categories()
  {
    await this.apiService.getTop3Categories().subscribe((response:any) => {
      console.log('Top_3 Categories: ',response);
    });  
  }

  async getTopCategory()
  {
    await this.apiService.getTopCategory().subscribe((response:any) => {
      console.log('Top Categories: ',response);
    });  
  }

  async getTop3Regions()
  {
    await this.apiService.getTop3Regions().subscribe((response:any) => {
      console.log('Top_3 Events: ',response);
    });  
  }

  async getTopRegion()
  {
    await this.apiService.getTopRegions().subscribe((response:any) => {
      console.log('Top_3 Events: ',response);
    });  
  }

  async getTop3SupportersEvents()
  {
    await this.apiService.getTop3SupportersEvents().subscribe((response:any) => {
      console.log('Top_3 Supporters Events: ',response);
    });   
  }

  async getTopSupportersEvent()
  {
    await this.apiService.getTopSupportersEvents().subscribe((response:any) => {
      console.log('Top Supporters Event: ',response);
    });  
  }

  async getTop3Supporters()
  {
    await this.apiService.getTop3Supporters().subscribe((response:any) => {
      console.log('Top_3 Supporters: ',response);
    });  
  }

  async getTopSupporters()
  {
    await this.apiService.getTopSupporters().subscribe((response:any) => {
      console.log('Top Supporters',response);
    });  
  }

  async getOrganisersEvents()
  {
    await this.apiService.getOrganisersEvents().subscribe((response:any) => {
      console.log('Organisers Events: ',response);
    });  
  }
  
  async getEventRegionCount()
  {
    await this.apiService.getEventRegionCount().subscribe((response:any) => {
      console.log('Event Region Count: ',response);
    });  
  }

  async getEventCategoryCount()
  {
    await this.apiService.getEventCategoryCount().subscribe((response:any) => {
      console.log('Event Category Count: ',response);
    });  
  }



}
