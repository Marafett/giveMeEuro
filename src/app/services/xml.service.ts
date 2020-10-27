import { Injectable } from '@angular/core';
import { parseString } from 'xml2js'

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  fetchData: any

  constructor() { }

  parserXML(xml: any) {
    parseString(xml, (err, result) => {
      if (err) {
        console.error(err)
      }
      this.fetchData = result
    })
    return this.fetchData
  }

}
