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
    this.HTTPService.getABIF().subscribe(result => {
      this.untericht = result;
      this.HTTPService.getPicked(this.id).subscribe(resultPicked => {
        for(var i = 0; i < resultPicked.length; i++){
          this.pickedFacher.push(Object.assign({}, this.untericht.find(b => b.id == resultPicked[i].gegenstandid)));
        }
        console.log(this.pickedFacher);
      });;
    });;
   }

  ngOnInit() {
  }


  event(i : number){
  
  }

  picked(i : number){
    var x = this.untericht.find(b => b.id == this.untericht[i].id);
    var z = this.pickedFacher.find(b => b.id == x.id);
    if(z != undefined){
      var index = this.pickedFacher.findIndex(b => b.id == x.id);
      this.pickedFacher.splice(index, 1);
    }
    else{
      this.pickedFacher.push(Object.assign({}, x));
    }
  }

  doSend(){
    let x : number[] = [];
    this.pickedFacher.forEach(b => x.push(b.id));
    this.HTTPService.sendPicked(x, this.id);
    this.snackBar.open("Daten wurden gesendet.", "OK",{
      duration: 5000,
    });
  }
}
