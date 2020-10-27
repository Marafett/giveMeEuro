import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  activeUrl: Observable<any>
  jsonOrXml: boolean = false

  constructor(private http: HttpClient) { 
    this.activeUrl = this.getEuroJSON()
  }

  getEuroXML(): Observable<any> {
    return this.http.get('https://www.cbr-xml-daily.ru/daily_utf8.xml', {responseType: 'text'})
  }

  getEuroJSON(): Observable<any> {
    return this.http.get('https://www.cbr-xml-daily.ru/daily_json.js', {responseType: 'json'})
  }
}
