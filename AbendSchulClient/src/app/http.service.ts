import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facher } from './Facher';
import { Person } from './Person';

@Injectable()
export class HttpService {

  request : string;
  http : HttpClient;
  constructor(http : HttpClient) { 
    this.http = http;
  }

  public getABIF(){
    return this.http.get<Facher[]>('http://localhost:6969/getKurseABIF');
  }

  public getAKIF(){
    return this.http.get<Facher[]>('http://localhost:6969/getKurseAKIF');
  }

  public getOK(username : string, password : string){
    this.request = 'http://localhost:6969/AllowedUser/'+ username;
    return this.http.post<number>(this.request, password);
  }

  public getUser(username : string){
    this.request = 'http://localhost:6969/getUser/'+ username;
    console.log(this.request);
    return this.http.get<Person>(this.request);
  }

  sendPicked(picked : string[], username : string){
    this.request = 'http://localhost:6969/setPicked/'+ username;
    return this.http.post<number>(this.request, picked);
  }
}