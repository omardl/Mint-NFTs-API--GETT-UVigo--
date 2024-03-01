import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNFTComponent } from './add-nft.component';

describe('AddNFTComponent', () => {
  let component: AddNFTComponent;
  let fixture: ComponentFixture<AddNFTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNFTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNFTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
