import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  
import { ModalController } from '@ionic/angular';
import { user,service} from '@capstone-meet-app/services';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';

describe('FeatureComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent,CommonModule, FormsModule,IonicModule,HttpClientModule],
      providers:[service]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('Profile getEvent Count',async ()=>{
    component.getEventCount=jest.fn().mockImplementation(()=>{return 5});
    const value=component.getEventCount()
    expect(value).toBe(5);
  })

  it('Profile getEvent Count',async ()=>{
    component.getEventCount=jest.fn().mockImplementation(()=>{return 5});
    const value=component.getEventCount()
    expect(value).toBe(5);
  })

  it('Profile getCurrentUser',async ()=>{
    component.getCurrentUser=jest.fn().mockImplementation(()=>{return {username:'username',id:'12345'}});
    const value=await component.getCurrentUser();
    expect(value).toStrictEqual({username:'username',id:'12345'});
  });

  it('Profile getFriendCount',async ()=>{
    component.getFriendCount=jest.fn().mockImplementation(()=>{return 100});
    const value=await component.getFriendCount();
    expect(value).toStrictEqual(100);
  } );

  it('Refresh window',()=>{
    component.refreshPage=jest.fn().mockReturnValue('refreshed');
    const value=component.refreshPage();
    console.log(value);
    
  })
});
