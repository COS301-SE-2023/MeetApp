import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppAttendeesComponent } from './app-attendees.component';

describe('AppAttendeesComponent', () => {
  let component: AppAttendeesComponent;
  let fixture: ComponentFixture<AppAttendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAttendeesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
