import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceletonItemPageComponent } from './sceleton-item-page.component';

describe('SceletonItemPageComponent', () => {
  let component: SceletonItemPageComponent;
  let fixture: ComponentFixture<SceletonItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceletonItemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceletonItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
