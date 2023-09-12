import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//import { Chart } from 'chart.js';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import Chart from 'chart.js/auto';

@Component({
  selector: 'capstone-meet-app-app-analytics',
  standalone: true,
  imports: [CommonModule,IonicModule,NgxChartsModule ],
  templateUrl: './app-analytics.component.html',
  styleUrls: ['./app-analytics.component.css'],
})
export class AppAnalyticsComponent  implements AfterViewInit {
  @ViewChild('pieChartCanvas') private pieChartCanvas!: ElementRef;
  private pieChart: Chart<'pie', number[], string> | undefined;
  histogramData: any[] = [];


 //constructor() { }

  ngAfterViewInit() {
    this.createPieChart();
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
  
}
