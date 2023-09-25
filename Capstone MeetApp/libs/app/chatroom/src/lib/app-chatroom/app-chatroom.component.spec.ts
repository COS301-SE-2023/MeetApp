import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppChatroomComponent } from './app-chatroom.component';

describe('AppChatroomComponent', () => {
  let component: AppChatroomComponent;
  let fixture: ComponentFixture<AppChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChatroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
