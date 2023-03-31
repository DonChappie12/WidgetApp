import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFilesComponent } from './local-files.component';

describe('LocalFilesComponent', () => {
  let component: LocalFilesComponent;
  let fixture: ComponentFixture<LocalFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
