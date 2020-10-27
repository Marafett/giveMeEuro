import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators'
import { DataService } from 'src/app/services/data.service';
import { XmlService } from 'src/app/services/xml.service';

@Component({
  selector: 'app-euro',
  templateUrl: './euro.component.html',
  styleUrls: ['./euro.component.scss']
})
export class EuroComponent implements OnInit, OnDestroy {

  euro: any
  sub: Subscription

  constructor(private dataService: DataService, private xmlService: XmlService) {}

  ngOnInit(): void {
    this.sub = timer(0, 10000).pipe(
      switchMap(() => this.dataService.activeUrl.pipe(
        catchError( () => {
          this.dataService.activeUrl = this.dataService.getEuroXML()
          this.dataService.jsonOrXml = true
          return this.dataService.activeUrl
        })
      ))
    ).subscribe(res => {
      if (this.dataService.jsonOrXml === false) {
        this.euro = res.Valute.EUR.Value
      } else {
        this.euro = this.xmlService.parserXML(res).ValCurs.Valute[11].Value[0]
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
