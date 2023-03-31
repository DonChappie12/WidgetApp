import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private BASE_URL = "http://localhost:5202/api/widget"
  constructor(private _http: HttpClient) { }

  getLatestNews(){
    return this._http.get(this.BASE_URL + "/news")
  }

  getCurrentWeather(paramters: {}){
    return this._http.get(this.BASE_URL + "/weather", {params: paramters})
  }

  getLocalFiles(){
    return this._http.get(this.BASE_URL + "/local-files")
  }
}
