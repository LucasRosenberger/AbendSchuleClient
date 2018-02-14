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
  pickedFacher : Facher[] = [];

  constructor(http : HttpService, public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.HTTPService = http;
    this.id = this.route.snapshot.paramMap.get('id');
    this.HTTPService.getUser(this.id).subscribe(result => this.schueler = result);;
    this.HTTPService.getABIF().subscribe(result => this.untericht = result);;
   }

  ngOnInit() {
  }


  event(i : number){
  
  }

  picked(i : number){
    var x = this.untericht.findIndex(b => b.id == i);
    var y = this.pickedFacher.includes(this.untericht[x])
    console.log(y);
    if(y){
      var index = this.pickedFacher.findIndex(b => b.id == i);
      this.pickedFacher.splice(index, 1);
      console.log(this.pickedFacher);
    }
    else{
      this.pickedFacher.push(Object.assign({}, this.untericht[x]));
      console.log(JSON.stringify(this.pickedFacher));
    }
  }

  doSend(){
    console.log(this.schueler);
    this.snackBar.open("Daten wurden gesendet.", "OK",{
      duration: 5000,
    });
  }
}
