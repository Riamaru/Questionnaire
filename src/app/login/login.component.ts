import { Router } from '@angular/router';

import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../@services/user.service';
import { CommonModule } from '@angular/common';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef
  readonly accountError = new FormControl('', [Validators.required]);
  readonly passwordError = new FormControl('', [Validators.required]);


  constructor(
    private router: Router,
    private userService: UserService,

  ) {

  }
  account = ""
  password = ""
  accountWrongCount = 0
  passwordWrongCount = 0

  accountWarningBool = true
  passwordWarningBool = true
  loginBlocked = false

  showPassword = true;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  goback() {
    this.router.navigateByUrl('/QuestionList')
  }

  login() {

    if (!this.account) {
      this.accountWarningBool = true
      alert("請輸入帳號")
      return
    }


    if (this.loginBlocked) {
      alert('帳號輸入錯誤超過3次，請5秒後再試')
      return
    }

    if (this.account != '123') {
      this.accountWarningBool = false
      this.passwordWarningBool = true
      this.accountWrongCount += 1

    } else {
      this.accountWarningBool = true
      if (this.password != '123') {
        this.passwordWarningBool = false
        this.passwordWrongCount += 1
      } else {
        this.passwordWarningBool = true
      }
    }




    if (this.accountWrongCount >= 3 || this.passwordWrongCount >= 3) {
      alert('輸入錯誤超過3次，請5秒後再試')
      this.blockLogin()
    }


    if (this.account == '123' && this.password == '123' && this.accountWrongCount < 3 && this.passwordWrongCount < 3) {
      sessionStorage.setItem('account', this.account);
      sessionStorage.setItem('isLoggedIn', 'true');  // 標記用戶已登入

      this.userService.changeToAdminMode()
      this.router.navigateByUrl('/AdminQuestionList')
    }

  }

  blockLogin() {
    this.loginBlocked = true

    setTimeout(() => {
      this.accountWrongCount = 0
      this.passwordWrongCount = 0
      this.loginBlocked = false

    }, 5000);
  }


  toPassword() {
    this.passwordInput.nativeElement.focus()
  }



}
