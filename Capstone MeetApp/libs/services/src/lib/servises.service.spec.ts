import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { service, events,organiser, user } from './servises.service'; // Import your service and interfaces
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


  it('should set and retrieve the token from local storage', () => {
    const testToken = 'testToken'; // Replace with your test token value

    myService.setToken(testToken);

    const retrievedToken = myService.getToken();

    expect(retrievedToken).toEqual(testToken);
  });

  it('should remove the token from local storage', () => {
    const testToken = 'testToken'; // Replace with your test token value

    myService.setToken(testToken);
    myService.removeToken();

    const retrievedToken = myService.getToken();

    expect(retrievedToken).toBeNull();
  });

  it('should set and retrieve the username from local storage', () => {
    const testUsername = 'testUsername'; // Replace with your test username value

    myService.setUsername(testUsername);

    const retrievedUsername = myService.getUsername();

    expect(retrievedUsername).toEqual(testUsername);
  });

  it('should set and retrieve the username from local storage', () => {
    const testUsername = 'testUsername'; // Replace with your test username value

    myService.setUsername(testUsername);

    const retrievedUsername = myService.getUsername();

    expect(retrievedUsername).toEqual(testUsername);
  });

  it('should remove the username from local storage', () => {
    const testUsername = 'testUsername'; // Replace with your test username value

    myService.setUsername(testUsername);
    myService.removeUsername();

    const retrievedUsername = myService.getUsername();

    expect(retrievedUsername).toBeNull();
  });

  it('should remove the username from local storage', () => {
    const testUsername = 'testUsername'; // Replace with your test username value

    myService.setUsername(testUsername);
    myService.removeUsername();

    const retrievedUsername = myService.getUsername();

    expect(retrievedUsername).toBeNull();
  });

  it('should create common headers with x-api-key', () => {
    const commonHeaders = myService.getCommonHeaders();

    expect(commonHeaders.has('x-api-key')).toBeTruthy();
    expect(commonHeaders.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);
  });

  it('should create auth headers with x-api-key, Content-Type, and Authorization', () => {
    // Create a simple mock for getToken
    myService.getToken = () => 'testToken';

    const authHeaders = myService.getAuthHeaders();

    expect(authHeaders.has('x-api-key')).toBeTruthy();
    expect(authHeaders.has('Content-Type')).toBeTruthy();
    expect(authHeaders.has('Authorization')).toBeTruthy();

    expect(authHeaders.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);
    expect(authHeaders.get('Content-Type')).toEqual('application/json');
    expect(authHeaders.get('Authorization')).toContain('Bearer testToken');
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

  it('should get events by region with correct headers', () => {
    const region = 'SampleRegion'; // Replace with your desired region

    const dummyEvents = [
      {
        id: '1',
        name: 'Event 1',
        // Add more properties as needed
      },
      {
        id: '2',
        name: 'Event 2',
        // Add more properties as needed
      },
    ]; // Replace with your dummy data

    myService.getEventsByRegion(region).subscribe((events) => {
      expect(events).toEqual(dummyEvents);
    });

    const expectedUrl = `${environment.BASE_URL}/events/daterange/api/events/region/${region}`; // Replace with your actual API endpoint URL
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    //expect(req.request.headers.get('Authorization')).toContain('Bearer '); // Adjust this as per your implementation

    req.flush(dummyEvents);
  });

  it('should get event attendance count with correct headers', () => {
    const eventId = '1'; // Replace with the event ID you want to test

    const dummyCount = 42; // Replace with the expected attendance count

    myService.getEventAttendanceCount(eventId).subscribe((count) => {
      expect(count).toEqual(dummyCount);
    });

    const expectedUrl = `${environment.BASE_URL}events/${eventId}/attendance-count`; // Replace with your actual API endpoint URL
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    //expect(req.request.headers.get('Authorization')).toContain('Bearer '); // Adjust this as per your implementation

    req.flush(dummyCount);
  });

  
  it('should get event attendance with correct headers', () => {
    const eventId = '1'; // Replace with the event ID you want to test

    const dummyAttendance = [
      {
        userId: 'user1',
        userName: 'User 1',
        // Add more properties as needed
      },
      {
        userId: 'user2',
        userName: 'User 2',
        // Add more properties as needed
      },
    ]; // Replace with your dummy data

    myService.getEventAttendance(eventId).subscribe((attendance) => {
      expect(attendance).toEqual(dummyAttendance);
    });

    const expectedUrl = `${environment.BASE_URL}events/${eventId}/attendance`; // Replace with your actual API endpoint URL
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    //expect(req.request.headers.get('Authorization')).toContain('Bearer '); // Adjust this as per your implementation

    req.flush(dummyAttendance);
  });


  //TEST FOR USER
  it('should create a user with the correct headers and data', () => {
    const emailAddress= 'example@gmail.com'
    const username = 'new-user';
    const password = 'password123';
    const profilePicture = 'profile.jpg';
    const region = 'New York';
    const interests = ['interest1','interest2'];
    myService
      .createUser(emailAddress,username, password, profilePicture, region,interests)
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
      emailAddress,
      username,
      password,
      profilePicture,
      region,
      interests
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

  
  it('should get all users with the correct headers', () => {
    myService.getAllUsers().subscribe((response) => {
      // You can add assertions here for the list of users if needed
    });

    const expectedUrl = environment.BASE_URL + 'users';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Simulate a successful response (replace with actual list of users if needed)
    const fakeUsers: user[] = [
      // Define your expected list of users here
      {
        emailAddress: 'f1@gmail.com',
        username: 'FRIEND1',
        password:'pass1',
        profilePicture:'p1.png',
        region:'r1',
        interests: ['interest1'],
        // Add other user data as needed
      },
      {
        emailAddress: 'f12@gmail.com',
        username: 'FRIEND2',
        password:'pass2',
        profilePicture:'p2.png',
        region:'r2',
        interests: ['interest1','interest2'],
      }
    ];
    req.flush(fakeUsers);
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
    const emailAddress= 'example@gmail.com'
    const username = 'test-user';
    const password = 'new-password';
    const profilePicture = 'new-profile.jpg';
    const region = 'New Region';
    const interests = ['interest1','interest2'];

    myService.updateUser(emailAddress,username, password, profilePicture, region,interests).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/update';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('PATCH');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
   // expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      emailAddress,
      username,
      password,
      profilePicture,
      region,
      interests
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  it('should get user attendances with the correct headers', () => {
    myService.getUserAttendances().subscribe((attendances) => {
      // You can add assertions here for the attendances if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/attendances';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual data if needed)
    const fakeAttendances = [
      // Define your expected attendances data here
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
    req.flush(fakeAttendances);
  });

  it('should get user attendance count with the correct headers', () => {
    myService.getUserAttendancesCount().subscribe((count) => {
      // You can add assertions here for the attendance count if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/attendances/count';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with the actual count if needed)
    const fakeCount = 10; // Replace with your expected count
    req.flush(fakeCount);
  });


  
  it('should get user friends by username with the correct headers', () => {
    const username = 'test-username';

    myService.getFriendsbyUsername(username).subscribe((friends) => {
      // You can add assertions here for the friends if needed
    });

    const expectedUrl = environment.BASE_URL + `users/${username}/friends`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Simulate a successful response (replace with actual data if needed)
    const fakeFriends = [
      // Define your expected friends data here
      {
        id: '123',
        username: 'FRIEND1',
        // Add other user data as needed
      },
      {
        id: '12023',
        username: 'FRIEND2',
        // Add other user data as needed
      }
      ,{
        id: '12355',
        username: 'FRIEND33',
        // Add other user data as needed
      }
    ];
    req.flush(fakeFriends);
  });

  //TEST FOR ORGANISER
  it('should create an organiser with the correct headers and data', () => {
    const emailAddress = 'organiser@example.com';
    const username = 'organiser-user';
    const password = 'organiser-password';
    const name = 'Organiser Name';
    const events = ['Event1', 'Event2']; // Replace with actual event names

    myService.createOrginiser(emailAddress, username, password, name, events).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/signup';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      emailAddress,
      username,
      password,
      name,
      events,
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  it('should authenticate an organiser with the correct headers and data', () => {
    const username = 'organiser-user';
    const password = 'organiser-password';

    myService.authOrganiser(username, password).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/login';
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
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  
  it('should get all organisers with the correct headers', () => {
    myService.getAllOrganisers().subscribe((response) => {
      // You can add assertions here for the organisers if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Simulate a successful response (replace with actual organiser data if needed)
    const fakeOrganisers: organiser[] = [
      // Define your expected organisers data here
      {
        emailAddress:'org1@gmail.com',
        username:'Org1',
        password:'pass1',
        name:'orgName1',
        events:['Event1','Event2'],
      },
      {
        emailAddress:'org2@gmail.com',
        username:'Org2',
        password:'pass2',
        name:'orgName2',
        events:['Event1','Event2'],
      },
      {
        emailAddress:'org3@gmail.com',
        username:'Org3',
        password:'pass3',
        name:'orgName3',
        events:['Event1','Event2'],
      }
    ];
    req.flush(fakeOrganisers);
  });

 

  it('should get the logged-in organiser with the correct headers', () => {
    myService.getLogedInOrg().subscribe((response) => {
      // You can add assertions here for the logged-in organiser if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/account';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual organiser data if needed)
    const fakeOrganiser: organiser = {
      // Define your expected organiser data here
        emailAddress:'org1@gmail.com',
        username:'Org1',
        password:'pass1',
        name:'orgName1',
        events:['Event1','Event2'],
      
    };
    req.flush(fakeOrganiser);
  });


  it('should get an organiser by username with the correct headers', () => {
    const username = 'Org1';

    myService.getOrgbyUsername(username).subscribe((response) => {
      // You can add assertions here for the organiser if needed
    });

    const expectedUrl = environment.BASE_URL + `organisations/username/${username}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Simulate a successful response (replace with actual organiser data if needed)
    const fakeOrganiser: organiser = {
      // Define your expected organiser data here
      emailAddress:'org1@gmail.com',
        username:'Org1',
        password:'pass1',
        name:'orgName1',
        events:['Event1','Event2'],
    };
    req.flush(fakeOrganiser);
  });


  it('should get top 3 events with the correct headers', () => {
    myService.getTop3Events().subscribe((response) => {
      // You can add assertions here for the list of top events if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top3';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of top events if needed)
    const fakeTopEvents: events[] = [
      // Define your expected list of top events here
    ];
    req.flush(fakeTopEvents);
  });

  
  it('should get the top event with the correct headers', () => {
    myService.getTopEvent().subscribe((response) => {
      // You can add assertions here for the top event if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual top event data if needed)
    const fakeTopEvent: events = {
      // Define your expected top event data here

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
    
    };
    req.flush(fakeTopEvent);
  });

  it('should get top 3 categories with the correct headers', () => {
    myService.getTop3Categories().subscribe((response) => {
      // You can add assertions here for the list of top categories if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top3-categories';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of top categories if needed)
    const fakeTopCategories: any = [
      // Define your expected list of top categories here
     
    ];
    req.flush(fakeTopCategories);
  });

  it('should get the top category with the correct headers', () => {
    myService.getTopCategory().subscribe((response) => {
      // You can add assertions here for the top category if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top-category';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual top category data if needed)
    const fakeTopCategory: any = {
      // Define your expected top category data here
    };
    req.flush(fakeTopCategory);
  });

  it('should get top 3 regions with the correct headers', () => {
    myService.getTop3Regions().subscribe((response) => {
      // You can add assertions here for the list of top regions if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top3-regions';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of top regions if needed)
    const fakeTopRegions: any = [
      // Define your expected list of top regions here
    ];
    req.flush(fakeTopRegions);
  });

  it('should get top regions with correct headers', () => {
    const dummyRegions = ['Region1', 'Region2', 'Region3']; // Replace with your dummy data

    myService.getTopRegions().subscribe((regions) => {
      expect(regions).toEqual(dummyRegions);
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top-region'; // Replace with your actual API endpoint URL
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toContain('Bearer '); // Adjust this as per your implementation

    req.flush(dummyRegions);
  });
  
  it('should get top 3 supporters events with the correct headers', () => {
    myService.getTop3SupportersEvents().subscribe((response) => {
      // You can add assertions here for the list of top supporters events if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top3-supporters-events';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of top supporters events if needed)
    const fakeTopSupportersEvents: Event[] = [
      // Define your expected list of top supporters events here
    ];
    req.flush(fakeTopSupportersEvents);
  });

  it('should get top supporters events with the correct headers', () => {
    myService.getTopSupportersEvents().subscribe((responsee) => {
      // You can add assertions here for the list of top supporters events if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top-supporters-events';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of top supporters events if needed)
    const fakeTopSupportersEvents: any = [
      // Define your expected list of top supporters events here
    ];
    req.flush(fakeTopSupportersEvents);
  })

  it('should get top 3 supporters with the correct headers', () => {
    myService.getTop3Supporters().subscribe((response) => {
      // You can add assertions here for the list of top supporters if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top3-supporters';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of top supporters if needed)
    const fakeTopSupporters: user[] = [
      // Define your expected list of top supporters here
    ];
    req.flush(fakeTopSupporters);
  });

  it('should get the top supporter with the correct headers', () => {
    myService.getTopSupporters().subscribe((response) => {
      // You can add assertions here for the top supporter if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/top-supporter';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual top supporter data if needed)
    const fakeTopSupporter: user = {
      // Define your expected top supporter data here
        emailAddress: 's1@gmail.com',
        username: 'sup1',
        password:'pass1',
        profilePicture:'p1.png',
        region:'r1',
        interests: ['interest1'],
        // Add other user data as needed
      
    };
    req.flush(fakeTopSupporter);
  });

  it('should get organisers events with the correct headers', () => {
    myService.getOrganisersEvents().subscribe((response) => {
      // You can add assertions here for the list of organisers events if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of organisers events if needed)
    const fakeOrganisersEvents: events[] = [
      // Define your expected list of organisers events here
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
    req.flush(fakeOrganisersEvents);
  });

  it('should get event region count with the correct headers', () => {
    myService.getEventRegionCount().subscribe((response) => {
      // You can add assertions here for the list of event region counts if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/region-count';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual event region count data if needed)
    const fakeEventRegionCounts: any[] = [
      // Define your expected event region count data here
    ];
    req.flush(fakeEventRegionCounts);
  });

  it('should get event category count with the correct headers', () => {
    myService.getEventCategoryCount().subscribe((response) => {
      // You can add assertions here for the list of event category counts if needed
    });

    const expectedUrl = environment.BASE_URL + 'organisations/events/category-count';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual event category count data if needed)
    const fakeEventCategoryCounts: any[] = [
      // Define your expected event category count data here
    ];
    req.flush(fakeEventCategoryCounts);
  });


  //TEST FOR FRIENDS

  it('should send a friend request with the correct headers and data', () => {
    const requestee = 'friend-username';

    myService.sendfriendrequest(requestee).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friend/send-request';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      requestee,
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  it('should accept a friend request with the correct headers and data', () => {
    const requester = 'requester-username';

    myService.acceptFriendRequest(requester).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friend/accept-request';
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
      requester,
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });

  it('should delete a friend request with the correct headers and data', () => {
    const friendID = 'friend-id';

    myService.deleteFriendRequest(friendID).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friend/unfriend';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('DELETE');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Verify that the request body matches the expected data
    expect(req.request.body).toEqual({
      friendID,
    });

    // Simulate a successful response
    req.flush({}); // You can provide a response object if needed
  });


  it('should get the friend count with the correct headers', () => {
    myService.getFriendCount().subscribe((response) => {
      // You can add assertions here for the friend count if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friends/count';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual friend count if needed)
    const fakeFriendCount = 42; // Replace with your expected friend count
    req.flush(fakeFriendCount);
  });

  it('should get the list of friends with the correct headers', () => {
    myService.getFriends().subscribe((response) => {
      // You can add assertions here for the list of friends if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friends';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of friends if needed)
    const fakeFriends: user[] = [
      // Define your expected list of friends here
        {
          emailAddress: 'f1@gmail.com',
          username: 'FRIEND1',
          password:'pass1',
          profilePicture:'p1.png',
          region:'r1',
          interests: ['interest1'],
          // Add other user data as needed
        },
        {
          emailAddress: 'f12@gmail.com',
          username: 'FRIEND2',
          password:'pass2',
          profilePicture:'p2.png',
          region:'r2',
          interests: ['interest1','interest2'],
        }
    ];
    req.flush(fakeFriends);
  });

  it('should get the friend requests with the correct headers', () => {
    myService.getFriendRequest().subscribe((response) => {
      // You can add assertions here for the list of friend requests if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friend-requests';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of friend requests if needed)
    const fakeFriendRequests: user[] = [
      // Define your expected list of friend requests here
      {
        emailAddress: 'f1@gmail.com',
        username: 'FRIEND1',
        password:'pass1',
        profilePicture:'p1.png',
        region:'r1',
        interests: ['interest1'],
      }
    ];
    req.flush(fakeFriendRequests);
  });

  it('should get the pending friend requests with the correct headers', () => {
    myService.getPendingFriendRequest().subscribe((response) => {
      // You can add assertions here for the list of pending friend requests if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friend-requests/pending';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of pending friend requests if needed)
    const fakePendingFriendRequests: user[] = [
      // Define your expected list of pending friend requests here
    ];
    req.flush(fakePendingFriendRequests);
  });

  it('should get suggested friends with the correct headers', () => {
    myService.getSuggestedFriends().subscribe((response) => {
      // You can add assertions here for the list of suggested friends if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/friends/suggestions';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of suggested friends if needed)
    const fakeSuggestedFriends: user[] = [
      // Define your expected list of suggested friends here
      {
        emailAddress: 'f1@gmail.com',
        username: 'FRIEND1',
        password:'pass1',
        profilePicture:'p1.png',
        region:'r1',
        interests: ['interest1'],
      }
    ];
    req.flush(fakeSuggestedFriends);
  });

  it('should get mutual friends with the correct headers', () => {
    const username = 'target-username'; // Replace with an actual target username

    myService.getMutualFriends(username).subscribe((response) => {
      // You can add assertions here for the list of mutual friends if needed
    });

    const expectedUrl = environment.BASE_URL + `users/friends/mutuals/${username}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with actual list of mutual friends if needed)
    const fakeMutualFriends: user[] = [
      // Define your expected list of mutual friends here
      {
        emailAddress: 'f1@gmail.com',
        username: 'FRIEND1',
        password:'pass1',
        profilePicture:'p1.png',
        region:'r1',
        interests: ['interest1'],
        // Add other user data as needed
      },
      {
        emailAddress: 'f12@gmail.com',
        username: 'FRIEND2',
        password:'pass2',
        profilePicture:'p2.png',
        region:'r2',
        interests: ['interest1','interest2'],
      }
    ];
    req.flush(fakeMutualFriends);
  });

  
  //TEST FOR ATTENDING

  
  it('should attend an event with the correct data', () => {
    const organisationID = 'org-id'; // Replace with an actual organization ID
    const eventID = 'event-id'; // Replace with an actual event ID
    const userID = 'user-id'; // Replace with an actual user ID

    myService.attendEvent(organisationID, eventID, userID).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'attendances';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');

    // Simulate a successful response (replace with an actual response object if needed)
    const fakeResponse = {
      // Define your expected response data here
    };
    req.flush(fakeResponse);
  });

  it('should attend an event for a user with the correct data', () => {
    const eventID = 'event-id'; // Replace with an actual event ID

    myService.attendEventUser(eventID).subscribe((response) => {
      // You can add assertions here for the response if needed
    });

    const expectedUrl = environment.BASE_URL + 'users/attend';
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('POST');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Check the 'Authorization' header
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    // Simulate a successful response (replace with an actual response object if needed)
    const fakeResponse = {
      // Define your expected response data here
    };
    req.flush(fakeResponse);
  });

  it('should get attendance by ID with the correct headers', () => {
    const attendanceID = 'attendance-id'; // Replace with an actual attendance ID

    myService.getAttandanceByID(attendanceID).subscribe((response) => {
      // You can add assertions here for the attendance data if needed
    });

    const expectedUrl = environment.BASE_URL + `users/${attendanceID}/attendances`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Simulate a successful response (replace with actual attendance data if needed)
    const fakeAttendance: events[] = [
      // Define your expected attendance data here
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
    req.flush(fakeAttendance);
  });

  it('should get attendance count by ID with the correct headers', () => {
    const attendanceID = 'attendance-id'; // Replace with an actual attendance ID

    myService.getAttandanceCountByID(attendanceID).subscribe((response) => {
      // You can add assertions here for the attendance count if needed
    });

    const expectedUrl = environment.BASE_URL + `users/${attendanceID}/attendances/count`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');

    // Check the 'x-api-key' header
    expect(req.request.headers.get('x-api-key')).toEqual(environment.BACKEND_API_KEY);

    // Check the 'Content-Type' header
    //expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    // Simulate a successful response (replace with actual attendance count if needed)
    const fakeAttendanceCount = 42; // Replace with your expected attendance count
    req.flush(fakeAttendanceCount);
  });


});


