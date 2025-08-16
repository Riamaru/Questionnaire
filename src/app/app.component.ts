import { HttpClientService } from './@services/http-client.service';
import { Component, inject, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './@services/user.service';
import { QuestionService } from './@services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { LogOutDialogComponent } from './log-out-dialog/log-out-dialog.component';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { QuestionListService } from './@services/question-list.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private questionListService: QuestionListService,
    private httpClientService: HttpClientService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const el = this.sidenavContent.getElementRef().nativeElement;
        el.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
  title = 'Questionnaire';
  adminMode!: any

  json!: any

  currentRoute!: string;

  ngOnInit(): void {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const account = sessionStorage.getItem('account')
    console.log(account);

    console.log(isLoggedIn);

    if (isLoggedIn === 'true') {
      // 如果已登入，可以自動跳轉到已登入頁面，或者繼續顯示內容
      this.userService.changeToAdminMode()
      this.router.navigateByUrl('/AdminQuestionList');
    } else {
      // 未登入，可以讓用戶繼續在登入頁面，或者提示重新登入
      this.router.navigateByUrl('/QuestionList');
    }

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    this.userService.adminMode.subscribe((result) => {
      this.adminMode = result
    })


    const eventSource = new EventSource('http://localhost:8080/sse/subscribe');

    eventSource.addEventListener('quizUpdate', function (event) {
      const data = JSON.parse(event.data);
      console.log("接收到更新的問卷資料:", data);
    });

    eventSource.onerror = function (err) {
      console.error("SSE 連線錯誤:", err);
    };


  }

  adminLogIn() {
    this.questionService.questionData = null
    this.questionService.addQuestionData = null
    this.questionService.saveQuestArray = null
    this.questionService.editQuestionMode = false
    this.router.navigateByUrl('/login')
  }

  adminLogOut() {
    this.questionService.questionData = null
    this.questionService.addQuestionData = null
    this.questionService.saveQuestArray = null
    this.questionService.editQuestionMode = false
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('isLoggedIn');
    this.userService.changeToUserMode()
    this.openDialog()

    this.router.navigateByUrl('/QuestionList')
  }

  backHome() {
    this.questionService.questionData = null
    this.questionService.addQuestionData = null
    this.questionService.saveQuestArray = null
    this.questionService.editQuestionMode = false

    if (!this.adminMode) {
      this.router.navigateByUrl('/QuestionList')
    } else {
      this.router.navigateByUrl('/AdminQuestionList')
    }
  }

  // ura() {
  //   window.open("https://www.youtube.com/watch?v=yK4OrGWmyZk&ab_channel=NerdySkull")
  // }

  @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;

  topButtonPressed() {
    const el = this.sidenavContent.getElementRef().nativeElement
    el.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  readonly dialog = inject(MatDialog)

  openDialog() {
    const dialogRef = this.dialog.open(LogOutDialogComponent, {
      data: [],
      width: '300px',
      panelClass: 'addDialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/QuestionList')
    });
  }
}
