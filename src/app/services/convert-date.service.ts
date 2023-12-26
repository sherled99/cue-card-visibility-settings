import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConvertDateService {

  constructor() { }

  public addZero = (num : number) => {
    return num <= 9 ? '0' + num : num;
  };

  public convertTimestamp(timestamp: any, isSkipUTC: any){
    let newDate = new Date(timestamp);
    return isSkipUTC ? `${this.addZero(newDate.getHours())}:${this.addZero(newDate.getMinutes())}`
                           : `${this.addZero(newDate.getUTCHours())}:${this.addZero(newDate.getUTCMinutes())}`;
  }

  public convertTimestampToLastDate(timestamp: any){
    let lastDate = new Date(timestamp);
    let today = new Date();
    if(today.getMonth() == lastDate.getMonth() && today.getDate() == lastDate.getDate()){
      return `${this.addZero(lastDate.getUTCHours())}:${this.addZero(lastDate.getUTCMinutes())}`
    } else {
      return `${this.addZero(lastDate.getDate())}.${this.addZero(lastDate.getMonth() + 1)}.${lastDate.getFullYear()}`
    }
  }
}
