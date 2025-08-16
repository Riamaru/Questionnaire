import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  welcome = true;
  isOverlayVisible = true;


  feedbackMode = false;

  private _adminMode = new BehaviorSubject<boolean>(false)
  adminMode = this._adminMode.asObservable()

  changeToAdminMode() {
    this._adminMode.next(true)
  }

  changeToUserMode() {
    this._adminMode.next(false)
  }
}
