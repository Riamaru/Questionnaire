import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddQuestionPreviewComponent } from './admin-add-question-preview.component';

describe('AdminAddQuestionPreviewComponent', () => {
  let component: AdminAddQuestionPreviewComponent;
  let fixture: ComponentFixture<AdminAddQuestionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddQuestionPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddQuestionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
