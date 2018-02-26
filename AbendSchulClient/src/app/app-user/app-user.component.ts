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
  startpicked : Facher[] = [];
 
  constructor(http : HttpService, public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.HTTPService = http;
    this.id = this.route.snapshot.paramMap.get('id');
    this.HTTPService.getUser(this.id).subscribe(user =>{
      this.schueler = user[0];
      if(user[0].id != 0){
        if(user[0].klasse.replace(/[0-9]/,"").toUpperCase() == "ABIF"){
          this.HTTPService.getABIF().subscribe(result => {
            this.untericht = result;
            this.HTTPService.getPicked(this.id).subscribe(resultPicked => {
              for(var i = 0; i < resultPicked.length; i++){
                var x = this.untericht.findIndex(b => b.id == resultPicked[i].gegenstandid);
                this.pickedFacher.push(Object.assign({}, this.untericht[x]));
                this.untericht[x].picked = true;             
              }
              this.pickedFacher.forEach(b => this.startpicked.push(b));
            });;
          });;
        }
        else if(user[0].klasse.replace(/[0-9]/,"").toUpperCase() == "AKIF"){
          this.HTTPService.getAKIF().subscribe(result => {
            this.untericht = result;
            this.HTTPService.getPicked(this.id).subscribe(resultPicked => {
              for(var i = 0; i < resultPicked.length; i++){
                var x = this.untericht.findIndex(b => b.id == resultPicked[i].gegenstandid);
                this.pickedFacher.push(Object.assign({}, this.untericht[x]));
                this.untericht[x].picked = true;   
              }
              this.pickedFacher.forEach(b => this.startpicked.push(b));
            });;
          });;
        }
      }
      else{
        this.router.navigate(['/login']);
      }
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
    let deletetedpicked : number[] = [];
    let newpicked : number[] = [];
    let startpickednumerarr : number[] = [];
    this.startpicked.forEach(b => startpickednumerarr.push(b.id));
    this.pickedFacher.forEach(b => newpicked.push(b.id));
    for(var x = 0; x < this.startpicked.length; x++){
      if(!newpicked.includes(startpickednumerarr[x])){
        deletetedpicked.push(startpickednumerarr[x]);
      }
      else{
        newpicked.splice(newpicked.findIndex(b => b == startpickednumerarr[x]), 1);
      }
    }
    this.HTTPService.sendPicked(newpicked, deletetedpicked, this.id).subscribe(result =>{ 
      var x = result;
      this.snackBar.open("Daten wurden gesendet.", "OK",{
        duration: 5000,
      });
    });
  }
}
