import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTeamComponent } from './submit-team.component';

describe('SubmitTeamComponent', () => {
  let component: SubmitTeamComponent;
  let fixture: ComponentFixture<SubmitTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
