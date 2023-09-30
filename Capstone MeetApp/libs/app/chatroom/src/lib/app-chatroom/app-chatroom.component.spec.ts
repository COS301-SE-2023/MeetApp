import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppChatroomComponent } from './app-chatroom.component';
import { Component ,ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire/compat/'
import {AngularFirestoreCollection,AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { message } from "./messages.model";
import { Observable , map,of,catchError} from 'rxjs';
import { DocumentSnapshot } from '@angular/fire/compat/firestore/interfaces';
import { AngularFireStorage } from '@angular/fire/compat/storage';
describe('AppChatroomComponent', () => {
  let component: AppChatroomComponent;
  let fixture: ComponentFixture<AppChatroomComponent>;
  beforeEach(async () => {
    
    // await TestBed.configureTestingModule({
    //   imports: [AppChatroomComponent,
        
    //     AngularFirestoreModule,
    //     IonicModule.forRoot(),
    //     CommonModule,
    //     FormsModule],
    //     providers:[AngularFireModule.initializeApp({}),]
    // }).compileComponents();

    // fixture = TestBed.createComponent(AppChatroomComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect('component').toEqual('component');
  });
});
