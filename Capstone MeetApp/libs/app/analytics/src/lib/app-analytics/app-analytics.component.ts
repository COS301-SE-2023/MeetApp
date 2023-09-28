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

  OrganisationName:string| null=null;

  org_events=[{
    _id:'',
    name:'',
    organisation:'',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude: 0 , longitude:0},
    category: '',
    region: ''
  }];
  

  top3_events=[{event:{
    _id:'',
    name:'',
    organisation:'',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude: 0 , longitude:0},
    category: '',
    region: ''
  },
  count:0}];

  top_event={
    _id:'',
    name:'',
    organisation:'',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude: 0 , longitude:0},
    category: '',
    region: ''
  }
  
  top3_categories=[{category:''}];
  top_category='';

  top3_regions=[];
  top_region='';

  top3_supporters=[{
    username:'',
    region: ''
  }];

  top_supporters={
    username:'',
    region: ''
  };

  eventCategoryCount: { [key: string]: number } = {
    "": 0,
  };

  eventRegionCount: { [key: string]: number } = {
    "": 0,
  };

  
  top3_supportersevents=[{
    supporter:{
      id:'',
      username:'',
      password:'',
      profilePicture:'',
      region:''
    },
    topEvent:{
    _id:'',
    name:'',
    organisation:'',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude: 0 , longitude:0},
    category: '',
    region: ''
    } 
  
  }];

  top_supportersevents=[{
    supporter:{
      _id:'',
      username:'',
      password:'',
      profilePicture:'',
      region:''
    },
    topEvent:{
    _id:'',
    name:'',
    organisation:'',
    description:'',
    eventPoster:'',
    date: '',
    startTime: '',
    endTime: '',
    location: {latitude: 0 , longitude:0},
    category: '',
    region: ''
    } 
  
  }];

  current_org={
    id:'',
    password:'',
    username:'',
    exp:0,
    iat: 0
 }

 organiser={
  _id:'',
  username:'',
  password:'',
  name:'',
  events:[]
 }
 

 constructor(private zone: NgZone, private apiService: service) { 
  this.getTop3Events();
  this.getEventRegionCount();
 }

 ngOnInit() {
  this.getTop3Categories();
}

  ngAfterViewInit() {
    this.zone.run(() => {
      
     // this.createHistogram();
    });
  }
  private createHistogram() {
    if (this.histogramCanvas) {
      const ctx = this.histogramCanvas.nativeElement.getContext('2d');
  
      if (ctx) {
        const labels = Object.keys(this.eventRegionCount);
        const data = Object.values(this.eventRegionCount);
        console.log(this.eventRegionCount);


        this.histogramChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Event Region Count',
                data: data,
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
       
        const eventNames = this.top3_events.slice(0, 4).map(event => event.event.name);

        const eventData = this.top3_events.slice(0, 4).map(event => event.count);
  
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: eventNames,
            datasets: [{
              data: eventData,
              backgroundColor: ['#050A30', '#7EC8E3', '#7EC8E3'],
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
                text: 'TOP 3 events',
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });
      }
    }
    //console.log('kman the dawg',this.top3_events);
    //this.getTop3Events()
    //this.getTopEvent()
    this.getTop3Categories()
    
    //this.getTopCategory()
   
    this.getTop3Regions()
    
  
    //this.getTopRegion()
    
  
    this.getTop3SupportersEvents()
    
  
    this.getTopSupportersEvent()
   
  
    this.getTop3Supporters()
    
  
    this.getTopSupporters()
    
  
    this.getOrganisersEvents()
    
    
    //this.getEventRegionCount()
    this.getEventCategoryCount()
  
    this.getOrganiserName()
    this.getOrganisersEvents();
    //this.getTopEvent();
   // this.getTop3Events();
  }
  

  /* Analytics Services */

  async getTop3Events()
  {
    await this.apiService.getTop3Events().subscribe((response:any) => {
      this.top3_events=response;
      console.log('Top_3 Events: ',this.top3_events);
      this.createPieChart();
    });  
    
  }

  /*
  async getTopEvent()
  {
    await this.apiService.getTopEvent().subscribe((response:any) => {
      console.log('Top Event: ',response);
      this.top_event=response;
    });  
  }
  */

  async getTop3Categories()
  {
    await this.apiService.getTop3Categories().subscribe((response:any) => {
      this.top3_categories=response;
      console.log('Top_3 Categories: ',response);
    });  
  }

 /*
  async getTopCategory()
  {
    await this.apiService.getTopCategory().subscribe((response:any) => {
      console.log('Top Categories: ',response);
      this.top_category=response;
    });  
  }
  */

  async getTop3Regions()
  {
    await this.apiService.getTop3Regions().subscribe((response:any) => {
      this.top3_regions=response;
      console.log('Top_3 region: ',response);
    });  
  }

  /*
  async getTopRegion()
  {
    await this.apiService.getTopRegions().subscribe((response:any) => {
      console.log('Top rEGION: ',response);
      this.top_region=response;
    });  
  }
  */

  
  async getTop3SupportersEvents()
  {
    await this.apiService.getTop3SupportersEvents().subscribe((response:any) => {
      this.top3_supportersevents=response;
      console.log('Top_3 Supporters Events: ',response);
     
    });   
  }


  async getTopSupportersEvent()
  {
    await this.apiService.getTopSupportersEvents().subscribe((response:any) => {
      this.top_supportersevents=response;
      console.log('Top Supporters Event: ',response);
    });  
  }

  async getTop3Supporters()
  {
    await this.apiService.getTop3Supporters().subscribe((response:any) => {
      
      this.top3_supporters=response;
      console.log('Top_3 Supporters: ',response);
    });  
  }

  async getTopSupporters()
  {
    await this.apiService.getTopSupporters().subscribe((response:any) => {
      
      this.top_supporters=response;
      console.log('Top Supporters',response);
    });  
  }

  async getOrganisersEvents()
  {
    await this.apiService.getOrganisersEvents().subscribe((response:any) => {
      this.org_events=response;
      console.log('Organisers Events: ',this.org_events);
    });  
  }
  
  async getEventRegionCount()
  {
    await this.apiService.getEventRegionCount().subscribe((response:any) => {
      this.eventRegionCount=response;
      console.log('Event Region Count: ',this.eventRegionCount);
      this.createHistogram();
    });  
  }

  async getEventCategoryCount()
  {
    await this.apiService.getEventCategoryCount().subscribe((response:any) => {
      this.eventCategoryCount=response;
      console.log('Event Category Count: ',response);
    });  
  }

  getOrganiserName(){
    this.apiService.getLogedInOrg().subscribe((response:any) => {
      this.current_org=response;
      this.getCurrentOrganiser(this.current_org.username)
    
    });
  }


  getCurrentOrganiser(username:string|null){
    this.apiService.getOrgbyUsername(username).subscribe((response:any) => {
      this.organiser=response;
      console.log('Name of the organisation',this.organiser.name);
      this.OrganisationName=this.organiser.name;
    
    });
  }

}
