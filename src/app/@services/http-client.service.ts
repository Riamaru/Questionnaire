import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
constructor(private httpClient: HttpClient) { }

 baseUrl = 'http://localhost:8080';
//  baseUrl = 'http://192.168.0.62:8080';

  getApi(url: string) {
    return this.httpClient.get(this.baseUrl + url);
  }

  postApi(url: string, postData: any) {
    return this.httpClient.post(this.baseUrl + url, postData);
  }

  putApi(url: string, putData: any) {
    return this.httpClient.put(this.baseUrl + url, putData);
  }

  delApi(url: string) {
    return this.httpClient.delete(this.baseUrl + url);
  }
}
