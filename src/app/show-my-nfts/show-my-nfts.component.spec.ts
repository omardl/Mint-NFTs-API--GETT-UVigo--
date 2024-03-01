import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyNFTsComponent } from './show-my-nfts.component';

describe('ShowMyNFTsComponent', () => {
  let component: ShowMyNFTsComponent;
  let fixture: ComponentFixture<ShowMyNFTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMyNFTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMyNFTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
