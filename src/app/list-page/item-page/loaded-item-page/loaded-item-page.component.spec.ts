import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedItemPageComponent } from './loaded-item-page.component';

describe('LoadedItemPageComponent', () => {
  let component: LoadedItemPageComponent;
  let fixture: ComponentFixture<LoadedItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadedItemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadedItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
