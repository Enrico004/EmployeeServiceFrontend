import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowToastComponent } from './show-toast.component';

describe('ShowToastComponent', () => {
  let component: ShowToastComponent;
  let fixture: ComponentFixture<ShowToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
