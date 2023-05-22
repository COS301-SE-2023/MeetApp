import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';


  
describe('ApiService', () => {
  let service;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    httpClientMock = {
        post: jest.fn(),
        // Add other methods you need to mock (e.g., get, put, etc.)
      } as any;
    service = new ApiService(httpClientMock); // Replace with the actual name of your service class
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should make a POST request with login info and return the response', () => {
      const mockLoginInfo = { username: 'testUser', password: 'testPassword' };
      const mockResponse = { message: 'success', userInfo: { username: 'testUser' } };

      // Mock the HTTP post method
      jest.spyOn(service.http, 'post').mockReturnValue(of(mockResponse));

      // Call the login method
      const result$ = service.login(mockLoginInfo);

      // Check if the HTTP post method was called with the correct arguments
      expect(service.http.post).toHaveBeenCalledWith(
        service.apiURL + '/login',
        JSON.stringify(mockLoginInfo),
        service.httpOptions
      );

      // Subscribe to the result and check the response
      result$.subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
    });
  });

  describe('handleError', () => {
    it('should handle errors', () => {
      const mockError = new Error('Test error');

      // Call the handleError method
      service.handleError(mockError);

      // You can add your own assertions here based on how the error is handled
      // For example, you can expect certain logs or error messages to be generated
    });
  });

  describe('loginMock', () => {
    it('should return false if the username is "techDemo"', () => {
      const mockLoginInfo = { username: 'techDemo', password: 'testPassword' };
      const result = service.loginMock(mockLoginInfo);
      expect(result).toBe(false);
    });

    it('should return true if the username is not "techDemo"', () => {
      const mockLoginInfo = { username: 'testUser', password: 'testPassword' };
      const result = service.loginMock(mockLoginInfo);
      expect(result).toBe(true);
    });
  });

  describe('signupMock', () => {
    it('should return an object with success message and user info', () => {
      const mockSignupInfo = { username: 'testUser', email: 'test@example.com' };
      const result = service.signupMock(mockSignupInfo);
      expect(result).toEqual({ message: 'success', userInfo: mockSignupInfo });
    });
  });

  describe('getAllEventsMock', () => {
    it('should return the mock events feed', () => {
      const result = service.getAllEventsMock();
      expect(result).toEqual(service.mockEventsFeed);
    });
  });

  describe('getRegionalEventsMock', () => {
    it('should return an array of events filtered by region', () => {
      const mockRegion = 'testRegion';
      const mockEvents = [
        { region: 'testRegion', name: 'Event 1' },
        { region: 'otherRegion', name: 'Event 2' },
        { region: 'testRegion', name: 'Event 3' }
      ];
      service.mockEventsFeed = mockEvents;

      const result = service.getRegionalEventsMock(mockRegion);
      const expected = [
        { region: 'testRegion', name: 'Event 1' },
        { region: 'testRegion', name: 'Event 3' }
      ];
      expect(result).toEqual(expected);
    });
  });
});
