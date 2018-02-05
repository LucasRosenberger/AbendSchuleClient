import { Component, OnInit } from '@angular/core';
import { Facher } from '../Facher';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http/src/client';
import { MatSnackBar } from '@angular/material';
import { Person } from '../Person';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  untericht : Facher[];
  schueler : Person;
  HTTPService : HttpService;
  id : string;

  constructor(http : HttpService, public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.HTTPService = http;
    this.id = this.route.snapshot.paramMap.get('id');
    this.HTTPService.getUser(this.id).subscribe(result => this.schueler = result);;
    console.log(this.schueler);
    this.HTTPService.getABIF().subscribe(result => this.untericht = result);;
   }

  ngOnInit() {
  }


  event(i : number){

  }

  doSend(){
    this.snackBar.open("Daten wurden gesendet.", "OK",{
      duration: 5000,
    });
  }
}
