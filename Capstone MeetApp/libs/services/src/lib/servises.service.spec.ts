import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { service, events } from './servises.service'; // Import your service and interfaces
import {environment } from "./environment";


describe('Service', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let myService: service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [service],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    myService = TestBed.inject(service);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('services should be created', () => {
    expect(myService).toBeTruthy();
  });

  it('should get all events and call a callback when data is available', (done) => {
    const dummyEvents: events[] = [
        {
            id: '1',
            name: 'Sample Event',
            organisation: 'Sample Org',
            description: 'This is a sample event',
            eventPoster: 'sample-poster.jpg',
            date: '2023-09-21',
            startTime: '10:00 AM',
            endTime: '2:00 PM',
            location: { latitude: 40.7128, longitude: -74.0060 },
            category: 'Sample Category',
            region: 'Sample Region',
        },
        {
            id: '2',
            name: 'Sample Event 2',
            organisation: 'Sample Org 2',
            description: 'This is a sample event 2',
            eventPoster: 'sample-poster.jpg2',
            date: '2023-09-21',
            startTime: '10:00 AM',
            endTime: '2:00 PM',
            location: { latitude: 40.7128, longitude: -74.0060 },
            category: 'Sample Category',
            region: 'Sample Region',
        }   
    ];

    const nextCallback = (data: any) => {
      expect(data).toEqual(dummyEvents);
    };

    const errorCallback = (error: any) => {
      fail('Expected a successful response, but got an error');
    };

    const completeCallback = () => {
      // This will not be called in this test case
    };

    myService.getAllEvents().subscribe(nextCallback, errorCallback, completeCallback);

    const req = httpTestingController.expectOne(environment.BASE_URL+'events');
    expect(req.request.method).toEqual('GET');

    req.flush(dummyEvents);

    // Use a setTimeout to ensure that the callback is not called after the test completes
    setTimeout(() => {
      done(); // Call done to signal the test completion
    });
  });

   
  it('should create an event with correct headers', () => {
    const dummyEvent = {
      name: 'Sample Event',
      organisation: 'Sample Org',
      description: 'This is a sample event',
      eventPoster: 'sample-poster.jpg',
      date: '2023-09-21',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      location: { latitude: 40.7128, longitude: -74.0060 },
      category: 'Sample Category',
      region: 'Sample Region',
    };

    myService.createEvents(
      dummyEvent.name,
      dummyEvent.organisation,
      dummyEvent.description,
      dummyEvent.eventPoster,
      dummyEvent.date,
      dummyEvent.startTime,
      dummyEvent.endTime,
      dummyEvent.location,
      dummyEvent.category,
      dummyEvent.region
    ).subscribe();

    const expectedUrl = environment.BASE_URL+'events'; // Replace with your actual API endpoint URL
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');
    
    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Verify that the request body matches the dummyEvent
    expect(req.request.body).toEqual(dummyEvent);

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  // ... (other test cases for error handling, etc. if needed)

  // ... (other test cases similarly modified)
});


