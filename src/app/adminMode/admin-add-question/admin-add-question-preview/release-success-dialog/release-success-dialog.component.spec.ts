import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseSuccessDialogComponent } from './release-success-dialog.component';

describe('ReleaseSuccessDialogComponent', () => {
  let component: ReleaseSuccessDialogComponent;
  let fixture: ComponentFixture<ReleaseSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseSuccessDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
