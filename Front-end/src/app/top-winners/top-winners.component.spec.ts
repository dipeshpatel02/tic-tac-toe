import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWinnersComponent } from './top-winners.component';

describe('TopWinnersComponent', () => {
  let component: TopWinnersComponent;
  let fixture: ComponentFixture<TopWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
