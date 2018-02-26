import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facher, Gegenstand, Session } from './Facher';
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
    return this.http.post<Session>(this.request, $.param({ 'password' : password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  public getUser(username : string){
    this.request = 'http://localhost:6969/getUser/'+ username;
    return this.http.get<Person>(this.request);
  }

  public getPicked(username : string){
    this.request = 'http://localhost:6969/getPickedFacher/'+ username;
    return this.http.get<Gegenstand[]>(this.request);
  }

  public sendPicked(picked : number[], deleted : number[], username : string){
    this.request = 'http://localhost:6969/setPicked/'+ username;
    return this.http.post<number>(this.request, $.param({ 'picked' : picked, 'deleted' : deleted }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  public sendNewPupils(picked : Person[], username : string){
    this.request = 'http://localhost:6969/sendnewPupils/'+ username;
    return this.http.post<number>(this.request, $.param({ 'newPupils' : picked }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  public sendNewFächer(picked : Facher[], username : string){
    this.request = 'http://localhost:6969/sendnewFacher/'+ username;
    return this.http.post<number>(this.request, $.param({ 'newFacher' : picked }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }
}