import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { service} from '@capstone-meet-app/services';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent functions callable', () => {
  let component: LoginComponent;
  let component1: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let  setTimeoutSpy: jest.SpyInstance<NodeJS.Timeout, [callback: (args: void) => void, ms?: number | undefined], any>;
  let apiService:service;
  class MockService {
    token='';
    async authUser(username:string,password:string ){
      return {
        user:'username',
        access_token:'accesstoken',
        message:'Login successful'
      };
      }
      
      setToken(token_str:string){
        this.token=token_str;
      }
    }


  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ], 
        providers: [
          LoginComponent,
          {provider:service,useClass:MockService},
          AlertController,
          ToastController,
          Location,
          LoadingController,
        ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    apiService=TestBed.inject(service);
    component1=TestBed.inject(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  //check if variable are empty
  it('variables not assigned',()=>{
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.username).toBe('');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('API Service Works ',async ()=>{
   
    const mock=jest.spyOn(apiService,'authUser');
    await apiService.authUser('username','password');
    expect(apiService.authUser).toBeCalledWith('username','password')
  });
 
  it('LogInUser is callable with parameters ',async ()=>{
    component1.LogInUser=jest.fn().mockResolvedValue({username:'name'});
    const mock= await component1.LogInUser('username','password');
    console.log(mock)
    expect(mock).toStrictEqual({username:"name"})
  });

  it('LogInOrganiser is callable with parameters ',async ()=>{
    component1.LogInOrg=jest.fn().mockResolvedValue({username:'name'});
    const mock= await component1.LogInOrg('username','password');
    expect(mock).toStrictEqual({username:"name"})
  });

  it('login is callable with parameters ',async ()=>{
    component1.login=jest.fn().mockResolvedValue({username:'name'});
    const mock= await component1.login('username','password');
    expect(mock).toStrictEqual({username:"name"})
  });

  it('showerrorToast is callable with parameter',async ()=>{
    component1.showErrorToast=jest.fn().mockResolvedValue({message:'message'});
    await component1.showErrorToast('message');
    expect(component1.showErrorToast).toBeCalled()
  });

  it('showerrorAlert is callable with parameter',async ()=>{
    component1.showErrorAlert=jest.fn().mockResolvedValue({message:'message'});
    await component1.showErrorAlert('message');
    expect(component1.showErrorAlert).toBeCalled()
  });

});
