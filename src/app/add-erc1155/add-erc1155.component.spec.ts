import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddErc1155Component } from './add-erc1155.component';

describe('AddErc1155Component', () => {
  let component: AddErc1155Component;
  let fixture: ComponentFixture<AddErc1155Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddErc1155Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddErc1155Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
