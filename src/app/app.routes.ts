import { Routes } from '@angular/router';
import { QuestionContentComponent } from './question-list/questionFirst/question-content/question-content.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionPreviewComponent } from './question-list/questionFirst/question-content/question-preview/question-preview.component';
import { AdminQuestionListComponent } from './adminMode/question-list/admin-question-list.component';
import { QuestionResultComponent } from './question-list/questionFirst/question-result/question-result.component';
import { LoginComponent } from './login/login.component';
import { AdminAddQuestionComponent } from './adminMode/admin-add-question/admin-add-question.component';
import { AdminAddQuestionPreviewComponent } from './adminMode/admin-add-question/admin-add-question-preview/admin-add-question-preview.component';
import { FeedbackComponent } from './adminMode/feedback/feedback.component';

export const routes: Routes = [
  { path: 'QuestionList', component: QuestionListComponent },
  { path: 'QuestionContent', component: QuestionContentComponent },
  { path: 'QuestionPreview', component: QuestionPreviewComponent },
  { path: 'QuestionResult', component: QuestionResultComponent },
  { path: 'AdminQuestionList', component: AdminQuestionListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addQuestion', component: AdminAddQuestionComponent },
  { path: 'addQuestionPreview', component: AdminAddQuestionPreviewComponent },
  { path: 'feedback', component: FeedbackComponent },




  { path: '', redirectTo: '/QuestionList', pathMatch: 'prefix' }
];
