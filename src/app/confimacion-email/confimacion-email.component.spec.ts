import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimacionEmailComponent } from './confimacion-email.component';

describe('ConfimacionEmailComponent', () => {
  let component: ConfimacionEmailComponent;
  let fixture: ComponentFixture<ConfimacionEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfimacionEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimacionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
