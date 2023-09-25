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

  //TEST FOR EVENTS
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

    setTimeout(() => {
      done(); 
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
    
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    expect(req.request.body).toEqual(dummyEvent);

    
    req.flush({});
    
  });

  it('should get an event by ID with the correct headers', () => {
    const eventId = '123'; 
    const expectedEvent: events = {
      id: '123',
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
    };

    myService.getEventByID(eventId).subscribe((event) => {
      expect(event).toEqual(expectedEvent);
    });

    const expectedUrl = environment.BASE_URL + `events/${eventId}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    req.flush(expectedEvent);
  });

  it('should get events by date range with the correct headers', () => {
    const startDate = '2023-09-01'; // Replace with a valid start date
    const endDate = '2023-09-30'; // Replace with a valid end date
    const expectedEvents: events[] = [
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

    myService.getEventsByRange(startDate, endDate).subscribe((events) => {
      expect(events).toEqual(expectedEvents);
    });

    const expectedUrl = environment.BASE_URL + `events/daterange/${startDate}/${endDate}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    
  
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    req.flush(expectedEvents);
  });

  //TEST FOR USER
  it('should create a user with the correct headers and data', () => {
    const email= 'example@gmail.com'
    const username = 'new-user';
    const password = 'password123';
    const profilePicture = 'profile.jpg';
    const region = 'New York';
    const interests = ['interest1','interest2'];
    myService
      .createUser(email,username, password, profilePicture, region,interests)
      .subscribe((response) => {
        // You can add assertions here for the response if needed
      });

    const expectedUrl = environment.BASE_URL + 'users/signup';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      username,
      password,
      profilePicture,
      region,
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  it('should authenticate a user with the correct headers and data', () => {
    const username = 'test-user';
    const password = 'test-user';

    myService.authUser(username, password).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/login';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      username:'test-user',
      password:'test-user',
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  it('should get the logged-in user with the correct headers', () => {
    const fakeUser = {
      id: '123',
      username: 'testuser',
      // Add other user data as needed
    };

    myService.getLogedInUser().subscribe((user) => {
      expect(user).toEqual(fakeUser);
    });

    const expectedUrl = environment.BASE_URL + 'users/account';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response with the fake user data
    req.flush(fakeUser);
  });
 
  it('should get a user by username with the correct headers', () => {
    const username = 'test-username';

    myService.getUserByUsername(username).subscribe((user) => {
      // You can add assertions here for the user if needed
    });

    const expectedUrl = environment.BASE_URL + `users/username/${username}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Simulate a successful response
    const fakeUser = {
      // Define your expected user data here
      username : 'test-username',
      password : 'password',
      profilePicture : 'pr',
      region : 'New York',
    };
    req.flush(fakeUser);
  });

  it('should update a user with the correct headers and data', () => {
    const username = 'test-user';
    const password = 'new-password';
    const profilePicture = 'new-profile.jpg';
    const region = 'New Region';

    myService.updateUser(username, password, profilePicture, region).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/update';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('PATCH');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      username,
      password,
      profilePicture,
      region,
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });


  //TEST FOR FRIENDS

  //TEST FOR ATTENDING

});


