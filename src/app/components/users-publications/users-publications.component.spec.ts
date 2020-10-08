import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPublicationsComponent } from './users-publications.component';

describe('UsersPublicationsComponent', () => {
  let component: UsersPublicationsComponent;
  let fixture: ComponentFixture<UsersPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
